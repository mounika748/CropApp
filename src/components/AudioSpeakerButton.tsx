import React, { useState } from 'react';
import { Volume2, Square } from 'lucide-react';
import { LanguageCode } from '../types';
import { playTermAudio } from '../utils/audioPronouncer';
import { speakText, stopSpeaking } from '../utils/speech';

interface AudioSpeakerButtonProps {
  termKey?: 'nitrogen' | 'phosphorus' | 'potassium' | 'ph' | 'temperature' | 'humidity' | 'rainfall';
  customText?: string;
  language: LanguageCode;
  className?: string;
  title?: string;
}

export const AudioSpeakerButton: React.FC<AudioSpeakerButtonProps> = ({
  termKey,
  customText,
  language,
  className = '',
  title = 'Listen in selected language'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);

    if (termKey) {
      playTermAudio(
        termKey,
        language,
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
    } else if (customText) {
      speakText(customText, language, () => {
        setIsPlaying(false);
      });
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={title}
      className={`inline-flex items-center justify-center p-1 rounded-md text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100/70 transition-colors focus:outline-none ${
        isPlaying ? 'bg-amber-100 text-amber-800 ring-1 ring-amber-300 animate-pulse' : ''
      } ${className}`}
    >
      {isPlaying ? (
        <Square className="w-3.5 h-3.5" />
      ) : (
        <Volume2 className="w-3.5 h-3.5" />
      )}
    </button>
  );
};
