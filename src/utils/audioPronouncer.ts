import { LanguageCode } from '../types';
import { speakText, stopSpeaking } from './speech';

export interface TermAudioInfo {
  name: string;
  explanation: string;
}

export const AGRICULTURAL_TERMS: Record<string, Partial<Record<LanguageCode, TermAudioInfo>>> = {
  nitrogen: {
    en: {
      name: 'Nitrogen',
      explanation: 'Nitrogen. Essential nutrient for green leaf canopy and vegetative plant growth.'
    },
    te: {
      name: 'నత్రజని',
      explanation: 'నత్రజని. మొక్క ఆకులు ఏపుగా ఎదగడానికి మరియు పచ్చదనానికి ఉపయోగపడే ముఖ్య పోషకం.'
    },
    hi: {
      name: 'नाइट्रोजन',
      explanation: 'नाइट्रोजन। पौधों के वानस्पतिक विकास और हरियाली के लिए प्रमुख पोषक तत्व।'
    },
    ta: {
      name: 'நைட்ரஜன் (தழைச்சத்து)',
      explanation: 'தழைச்சத்து. பயிரின் பசுமை மற்றும் இலைகளின் வளர்ச்சிக்குத் தேவையான முக்கிய சத்து.'
    },
    kn: {
      name: 'ಸಾರಜನಕ',
      explanation: 'ಸಾರಜನಕ. ಸಸ್ಯಗಳ ಎಲೆಗಳ ಬೆಳವಣಿಗೆಗೆ ಮತ್ತು ಹಸಿರಿಗೆ ಅತ್ಯಗತ್ಯ ಪೋಷಕಾಂಶ.'
    },
    ml: {
      name: 'നൈട്രജൻ',
      explanation: 'നൈട്രജൻ. സസ്യങ്ങളുടെ വളർച്ചയ്ക്കും പച്ചപ്പിനും ആവശ്യമായ പോഷകം.'
    },
    mr: {
      name: 'नायट्रोजन',
      explanation: 'नायट्रोजन. पिकांच्या शाकीय वाढीसाठी व पानांच्या हिरवेपणासाठी मुख्य घटक.'
    },
    gu: {
      name: 'નાઈટ્રોજન',
      explanation: 'નાઈટ્રોજન. છોડના વિકાસ અને લીલાશ માટે જરૂરી પોષક તત્વ.'
    },
    bn: {
      name: 'নাইট্রোজেন',
      explanation: 'নাইট্রোজেন। গাছের পাতা ও দৈহিক বৃদ্ধির জন্য প্রধান পুষ্টি উপাদান।'
    },
    pa: {
      name: 'ਨਾਈਟ੍ਰੋਜਨ',
      explanation: 'ਨਾਈਟ੍ਰੋਜਨ। ਬੂਟਿਆਂ ਦੇ ਪੱਤਿਆਂ ਅਤੇ ਵਾਧੇ ਲਈ ਜ਼ਰੂਰੀ ਤੱਤ।'
    },
    or: {
      name: 'ଯବକ୍ଷାରଜାନ',
      explanation: 'ଯବକ୍ଷାରଜାନ। ଗଛର ପତ୍ର ବୃଦ୍ଧି ପାଇଁ ମୁଖ୍ୟ ପୋଷକ ତତ୍ତ୍ୱ।'
    }
  },

  phosphorus: {
    en: {
      name: 'Phosphorus',
      explanation: 'Phosphorus. Crucial for root architecture development, rapid establishment, and seed formation.'
    },
    te: {
      name: 'భాస్వరం',
      explanation: 'భాస్వరం. వేర్లు లోతుగా బలంగా పెరగడానికి మరియు గింజ కట్టడానికి అత్యవసరమైన పోషకం.'
    },
    hi: {
      name: 'फास्फोरस',
      explanation: 'फास्फोरस। जड़ों के गहरे विकास और दानों के भराव के लिए अति महत्वपूर्ण पोषक तत्व।'
    },
    ta: {
      name: 'பாஸ்பரஸ் (மணிச்சத்து)',
      explanation: 'மணிச்சத்து. வேர்களின் ஆழமான வளர்ச்சி மற்றும் விதை உருவாக்கத்திற்கு இன்றியமையாதது.'
    },
    kn: {
      name: 'ರಂಜಕ',
      explanation: 'ರಂಜಕ. ಬೇರುಗಳ ಬೆಳವಣಿಗೆ ಮತ್ತು ಕಾಳು ಕಟ್ಟಲು ಅಗತ್ಯವಾದ ಪೋಷಕಾಂಶ.'
    },
    ml: {
      name: 'ഫോസ്ഫറസ്',
      explanation: 'ഫോസ്ഫറസ്. വേരുകളുടെ വളർച്ചയ്ക്കും ധാന്യങ്ങളുടെ വികാസത്തിനും അത്യന്താപേക്ഷിതം.'
    },
    mr: {
      name: 'फॉस्फरस (स्फुरद)',
      explanation: 'स्फुरद. मुळांच्या मजबूत वाढीसाठी आणि दाणे भरण्यासाठी आवश्यक घटक.'
    },
    gu: {
      name: 'ફોસ્ફરસ',
      explanation: 'ફોસ્ફરસ. મૂળના વિકાસ અને દાણા ભરવા માટે મહત્વપૂર્ણ.'
    },
    bn: {
      name: 'ফসফরাস',
      explanation: 'ফসফরাস। শিকড় বিস্তার ও ফলন গঠনের জন্য অপরিহার্য।'
    },
    pa: {
      name: 'ਫਾਸਫੋਰਸ',
      explanation: 'ਫਾਸਫੋਰਸ। ਜੜ੍ਹਾਂ ਦੇ ਵਾਧੇ ਅਤੇ ਦਾਣਿਆਂ ਦੇ ਪੱਕਣ ਲਈ ਲੋੜੀਂਦਾ ਤੱਤ।'
    },
    or: {
      name: 'ଫସଫରସ୍',
      explanation: 'ଫସଫରସ୍। ଚେରର ବୃଦ୍ଧି ଏବଂ ମଞ୍ଜି ଗଠନ ପାଇଁ ଜରୁରୀ।'
    }
  },

  potassium: {
    en: {
      name: 'Potassium',
      explanation: 'Potassium. Builds mechanical straw strength, drought tolerance, and disease resistance.'
    },
    te: {
      name: 'పొటాషియం',
      explanation: 'పొటాషియం. మొక్కకు రోగనిరోధక శక్తి, కరువును తట్టుకునే గుణం మరియు పంట నాణ్యతను పెంచుతుంది.'
    },
    hi: {
      name: 'पोटाश',
      explanation: 'पोटाश। पौधों को रोगों तथा सूखे से बचाने और दानों की चमक बढ़ाने वाला पोषक तत्व।'
    },
    ta: {
      name: 'பொட்டாசியம் (சாம்பல் சத்து)',
      explanation: 'சாம்பல் சத்து. பயிர்களுக்கு நோய் எதிர்ப்பு சக்தி மற்றும் வறட்சியைத் தாங்கும் திறனைத் தருகிறது.'
    },
    kn: {
      name: 'ಪೊಟ್ಯಾಶ್',
      explanation: 'ಪೊಟ್ಯಾಶ್. ರೋಗ ನಿರೋಧಕ ಶಕ್ತಿ ಮತ್ತು ಬೆಳೆಯ ಗುಣಮಟ್ಟ ಹೆಚ್ಚಿಸುವ ಪೋಷಕಾಂಶ.'
    },
    ml: {
      name: 'പൊട്ടാസ്യം',
      explanation: 'പൊട്ടാസ്യം. രോഗപ്രതിരോധ ശേഷിയും വരൾച്ചയെ അതിജീവിക്കാനുള്ള കരുത്തും നൽകുന്നു.'
    },
    mr: {
      name: 'पोटॅश (पालाश)',
      explanation: 'पालाश. पिकांची रोगप्रतिकारक शक्ती आणि दाण्यांची गुणवत्ता वाढवणारा घटक.'
    },
    gu: {
      name: 'પોટાશ',
      explanation: 'પોટાશ. રોગ સામે રક્ષણ અને ગુણવત્તા સુધારવા માટે જરૂરી.'
    },
    bn: {
      name: 'পটাশিয়াম',
      explanation: 'পটাশিয়াম। রোগ প্রতিরোধ ক্ষমতা ও দানার ওজন বৃদ্ধি করে।'
    },
    pa: {
      name: 'ਪੋਟਾਸ਼',
      explanation: 'ਪੋਟਾਸ਼। ਫ਼ਸਲ ਨੂੰ ਬਿਮਾਰੀਆਂ ਅਤੇ ਸੋਕੇ ਤੋਂ ਬਚਾਉਣ ਵਾਲਾ ਤੱਤ।'
    },
    or: {
      name: 'ପୋଟାସ୍',
      explanation: 'ପୋଟାସ୍। ରୋଗ ପ୍ରତିରୋଧକ ଶକ୍ତି ବୃଦ୍ଧି କରେ।'
    }
  },

  ph: {
    en: {
      name: 'Soil pH',
      explanation: 'Soil pH Level. Indicates whether soil is acidic, neutral, or alkaline for optimal nutrient intake.'
    },
    te: {
      name: 'నేల పిహెచ్',
      explanation: 'నేల పిహెచ్ స్థాయి. నేల ఆమ్ల గుణంలో ఉందా లేదా క్షార గుణంలో ఉందా అని తెలిపే కొలత.'
    },
    hi: {
      name: 'मृदा पीएच',
      explanation: 'मृदा पीएच मान। मिट्टी की अम्लीयता या क्षारीयता दर्शाता है, जिससे पोषक तत्वों का अवशोषण तय होता है।'
    },
    ta: {
      name: 'மண் அமில-காரத்தன்மை (pH)',
      explanation: 'மண் கார அமிலத்தன்மை. மண் சத்துக்களை உறிஞ்சும் நிலையைத் தெரிவிக்கும் அளவு.'
    },
    kn: {
      name: 'ಮಣ್ಣಿನ ಪಿಹೆಚ್',
      explanation: 'ಮಣ್ಣಿನ ಪಿಹೆಚ್ ಮಟ್ಟ. ಮಣ್ಣು ಆಮ್ಲೀಯವೋ ಅಥವಾ ಕ್ಷಾರೀಯವೋ ಎಂದು ತಿಳಿಸುತ್ತದೆ.'
    },
    ml: {
      name: 'മണ്ണിന്റെ പിഎച്ച്',
      explanation: 'മണ്ണിന്റെ പിഎച്ച് മൂല്യം. മണ്ണിലെ അമ്ല-ക്ഷാര സ്വഭാവം വ്യക്തമാക്കുന്നു.'
    },
    mr: {
      name: 'जमिनीचा सामू (pH)',
      explanation: 'जमिनीचा सामू. माती आम्लधर्मी आहे की क्षारधर्मी हे दर्शवणारे परिमाण.'
    },
    gu: {
      name: 'જમીનનો પી.એચ.',
      explanation: 'જમીન પી.એચ. સ્તર. જમીન એસિડિક છે કે આલ્કલાઇન તે દર્શાવે છે.'
    },
    bn: {
      name: 'মাটির পিএইচ (pH)',
      explanation: 'মাটির পিএইচ মান। মাটি আম্লিক না ক্ষারীয় তা নির্দেশ করে।'
    },
    pa: {
      name: 'ਮਿੱਟੀ ਦਾ ਪੀਐਚ',
      explanation: 'ਮਿੱਟੀ ਦਾ ਪੀਐਚ ਪੱਧਰ। ਮਿੱਟੀ ਦੇ ਤੇਜ਼ਾਬੀ ਜਾਂ ਖਾਰੀ ਹੋਣ ਦੀ ਜਾਣਕਾਰੀ ਦਿੰਦਾ ਹੈ।'
    },
    or: {
      name: 'ମାଟି ପିଏଚ୍',
      explanation: 'ମାଟିର ଅମ୍ଳ ଏବଂ କ୍ଷାର ସ୍ଥିତି ଦର୍ଶାଏ।'
    }
  },

  temperature: {
    en: {
      name: 'Temperature',
      explanation: 'Temperature. Ambient thermal condition affecting plant transpiration and growth rate.'
    },
    te: {
      name: 'ఉష్ణోగ్రత',
      explanation: 'ఉష్ణోగ్రత. మొక్కల పెరుగుదల మరియు నీటి ఆవిరిని ప్రభావితం చేసే వాతావరణ ఉష్ణోగ్రత.'
    },
    hi: {
      name: 'तापमान',
      explanation: 'तापमान। पौधों की वृद्धि और जल वाष्पीकरण को प्रभावित करने वाली गर्माहट।'
    },
    ta: {
      name: 'வெப்பநிலை',
      explanation: 'வெப்பநிலை. பயிர்களின் வளர்ச்சிக்குத் தேவையான தட்பவெப்ப அளவு.'
    },
    kn: {
      name: 'ತಾಪಮಾನ',
      explanation: 'ತಾಪಮಾನ. ಬೆಳೆಗಳ ಬೆಳವಣಿಗೆಯನ್ನು ನಿರ್ಧರಿಸುವ ಹವಾಮಾನ ಶಾಖ.'
    },
    ml: {
      name: 'താപനില',
      explanation: 'താപനില. സസ്യങ്ങളുടെ വളർച്ചയെ ബാധിക്കുന്ന അന്തരീക്ഷ ചൂട്.'
    },
    mr: {
      name: 'तापमान',
      explanation: 'तापमान. पिकांच्या वाढीसाठी आवश्यक असणारी उष्णता.'
    },
    gu: {
      name: 'તાપમાન',
      explanation: 'તાપમાન. પાકના વિકાસને અસર કરતું વાતાવરણ.'
    },
    bn: {
      name: 'তাপমাত্রা',
      explanation: 'তাপমাত্রা। গাছের খাদ্য তৈরিতে তাপমাত্রা প্রভাব ফেলে।'
    },
    pa: {
      name: 'ਤਾਪਮਾਨ',
      explanation: 'ਤਾਪਮਾਨ। ਫ਼ਸਲ ਦੇ ਵਾਧੇ ਲਈ ਮਹੱਤਵਪੂਰਨ ਮੌਸਮੀ ਗਰਮੀ।'
    },
    or: {
      name: 'ତାପମାତ୍ରା',
      explanation: 'ତାପମାତ୍ରା। ଫସଲର ଅଭିବୃଦ୍ଧି ପାଇଁ ଆବଶ୍ୟକ।'
    }
  },

  humidity: {
    en: {
      name: 'Humidity',
      explanation: 'Humidity. Percentage of water vapor present in farm air.'
    },
    te: {
      name: 'తేమ శాతం',
      explanation: 'గాలిలోని తేమ శాతం. గాలిలో ఉండే తేమ తెగుళ్లు మరియు పంట ఆరోగ్యాన్ని ప్రభావితం చేస్తుంది.'
    },
    hi: {
      name: 'नमी',
      explanation: 'हवा में नमी का प्रतिशत। अधिक नमी से कीट व रोगों की संभावना बढ़ती है।'
    },
    ta: {
      name: 'ஈரப்பதம்',
      explanation: 'காற்றில் உள்ள ஈரப்பதம். பயிர்களின் பூச்சி தாக்குதலைக் குறிக்கும்.'
    },
    kn: {
      name: 'ತೇವಾಂಶ',
      explanation: 'ಗಾಳಿಯಲ್ಲಿರುವ ತೇವಾಂಶದ ಪ್ರಮಾಣ.'
    },
    ml: {
      name: 'ഈർപ്പം',
      explanation: 'അന്തരീക്ഷത്തിലെ ഈർപ്പത്തിന്റെ അളവ്.'
    },
    mr: {
      name: 'हवेतील आर्द्रता',
      explanation: 'हवेतील पाण्याचे बाष्प प्रमाण.'
    },
    gu: {
      name: 'ભેજ',
      explanation: 'હવામાં ભેજનું પ્રમાણ.'
    },
    bn: {
      name: 'বাতাসের আর্দ্রতা',
      explanation: 'বাতাসে উপস্থিত জলীয় বাষ্পের পরিমাণ।'
    },
    pa: {
      name: 'ਨਮੀ',
      explanation: 'ਹਵਾ ਵਿਚਲੀ ਨਮੀ ਦੀ ਮਾਤਰਾ।'
    },
    or: {
      name: 'ଆର୍ଦ୍ରତା',
      explanation: 'ବାୟୁମଣ୍ଡଳରେ ଜଳୀୟବାଷ୍ପର ପରିମାଣ।'
    }
  },

  rainfall: {
    en: {
      name: 'Rainfall',
      explanation: 'Rainfall. Millimeters of seasonal rain water supplied naturally to farm soil.'
    },
    te: {
      name: 'వర్షపాతం',
      explanation: 'వర్షపాతం. పొలానికి సహజంగా లభించే వర్షపు నీటి పరిమాణం.'
    },
    hi: {
      name: 'वर्षा',
      explanation: 'वर्षा। खेत को प्राकृतिक रूप से मिलने वाले बारिश के पानी की मात्रा।'
    },
    ta: {
      name: 'மழைப்பொழிவு',
      explanation: 'பயிருக்குக் கிடைக்கும் இயற்கை மழைநீரின் அளவு.'
    },
    kn: {
      name: 'ಮಳೆ ಪ್ರಮಾಣ',
      explanation: 'ಜಮೀನಿಗೆ ಸಿಗುವ ನೈಸರ್ಗಿಕ ಮಳೆಯ ನೀರು.'
    },
    ml: {
      name: 'മഴയുടെ അളവ്',
      explanation: 'കൃഷിയിടത്തിൽ ലഭിക്കുന്ന പ്രകൃതിദത്ത മഴവെള്ളത്തിന്റെ അളവ്.'
    },
    mr: {
      name: 'पाऊस',
      explanation: 'शेताला मिळणारे पावसाचे पाणी.'
    },
    gu: {
      name: 'વરસાદ',
      explanation: 'કુદરતી રીતે મળતું વરસાદી પાણી.'
    },
    bn: {
      name: 'বৃষ্টিপাত',
      explanation: 'জমিতে প্রাকৃতিকভাবে প্রাপ্ত বৃষ্টির জল।'
    },
    pa: {
      name: 'ਮੀਂਹ',
      explanation: 'ਫ਼ਸਲ ਨੂੰ ਮਿਲਣ ਵਾਲਾ ਕੁਦਰਤੀ ਮੀਂਹ ਦਾ ਪਾਣੀ।'
    },
    or: {
      name: 'ବୃଷ୍ଟିପାତ',
      explanation: 'ପ୍ରାକୃତିକ ବର୍ଷା ଜଳର ପରିମାଣ।'
    }
  }
};

/**
 * Pronounce an agricultural term or custom phrase in the selected language.
 */
export function playTermAudio(
  termKey: string,
  language: LanguageCode,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  const termData = AGRICULTURAL_TERMS[termKey]?.[language] || AGRICULTURAL_TERMS[termKey]?.en;
  if (!termData) return false;

  const spokenText = `${termData.name}. ${termData.explanation}`;
  onStart?.();
  speakText(spokenText, language, () => {
    onEnd?.();
  });
  return true;
}
