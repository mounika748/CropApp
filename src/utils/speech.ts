import { LanguageCode } from '../types';
import { LANGUAGES } from '../data/translations';

// Map our app languages to standard BCP-47 speech recognition & synthesis codes
export const SPEECH_LANG_MAP: Record<LanguageCode, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  te: 'te-IN',
  ta: 'ta-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  bn: 'bn-IN',
  pa: 'pa-IN',
  or: 'or-IN',
  as: 'as-IN',
  ur: 'ur-IN',
  ne: 'ne-NP',
  kok: 'kok-IN',
  mni: 'mni-IN',
  brx: 'brx-IN',
  doi: 'doi-IN',
  mai: 'mai-IN',
  sat: 'sat-IN',
  ks: 'ks-IN',
  sa: 'sa-IN'
};

export function isSpeechRecognitionSupported(): boolean {
  return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export interface SpeechRecognitionHandlers {
  onResult: (transcript: string) => void;
  onError: (error: string) => void;
  onEnd: () => void;
}

export function createSpeechRecognizer(
  lang: LanguageCode,
  handlers: SpeechRecognitionHandlers
): { start: () => void; stop: () => void } | null {
  if (!isSpeechRecognitionSupported()) {
    handlers.onError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or an updated mobile browser.');
    return null;
  }

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = SPEECH_LANG_MAP[lang] || 'en-IN';

  recognition.onresult = (event: any) => {
    if (event.results && event.results.length > 0) {
      const transcript = event.results[0][0].transcript;
      handlers.onResult(transcript);
    }
  };

  recognition.onerror = (event: any) => {
    let msg = 'Error recognizing speech.';
    if (event.error === 'not-allowed') {
      msg = 'Microphone permission was denied. Please allow microphone access in your browser settings to use voice input.';
    } else if (event.error === 'no-speech') {
      msg = 'No speech detected. Please speak clearly into the microphone.';
    } else if (event.error === 'network') {
      msg = 'Network error occurred during speech recognition. Please check your connection.';
    }
    handlers.onError(msg);
  };

  recognition.onend = () => {
    handlers.onEnd();
  };

  return {
    start: () => {
      try {
        recognition.start();
      } catch (err: any) {
        handlers.onError('Could not start microphone. It may already be recording.');
      }
    },
    stop: () => {
      try {
        recognition.stop();
      } catch (err: any) {
        // ignore
      }
    }
  };
}

let activeUtterance: SpeechSynthesisUtterance | null = null;

export function speakText(text: string, lang: LanguageCode, onEnd?: () => void): void {
  if (!isSpeechSynthesisSupported()) return;

  // Stop any currently playing audio
  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  const targetCode = SPEECH_LANG_MAP[lang] || 'en-IN';
  utterance.lang = targetCode;
  utterance.rate = 0.95; // slightly slower for clear comprehension by farmers
  utterance.pitch = 1.0;

  // Try matching best voice if available in system
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang === targetCode || v.lang.startsWith(targetCode.split('-')[0]));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onend = () => {
    activeUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    activeUtterance = null;
    if (onEnd) onEnd();
  };

  activeUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
    activeUtterance = null;
  }
}
