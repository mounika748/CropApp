import { LanguageCode, LanguageInfo } from '../types';

export const LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', speechCode: 'en-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', speechCode: 'te-IN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', speechCode: 'hi-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', speechCode: 'ta-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', speechCode: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', speechCode: 'ml-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', speechCode: 'mr-IN' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', speechCode: 'gu-IN' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speechCode: 'bn-IN' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', speechCode: 'pa-IN' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', speechCode: 'or-IN' }
];

export interface TranslationDictionary {
  appTitle: string;
  appSubtitle: string;
  navHome: string;
  navDashboard: string;
  navSoilRec: string;
  navRegionRec: string;
  navFertilizer: string;
  navSoilHealth: string;
  navWeather: string;
  navCrops: string;
  navCompare: string;
  navHistory: string;
  getStarted: string;
  speakToApp: string;
  listening: string;
  stopListening: string;
  listenAudio: string;
  stopAudio: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  ph: string;
  temperature: string;
  humidity: string;
  rainfall: string;
  state: string;
  district: string;
  soilType: string;
  waterAvailability: string;
  previousCrop: string;
  useMyLocation: string;
  locating: string;
  getRecommendation: string;
  recommendedCrop: string;
  suitabilityScore: string;
  alternativeCrops: string;
  fertilizerAdvisory: string;
  soilHealthReport: string;
  farmingAdvice: string;
  deficient: string;
  optimal: string;
  excess: string;
  printReport: string;
  estimatedNotice: string;
  clearHistory: string;

  // New strict-language and location keys
  selectStatePlaceholder: string;
  selectDistrictPlaceholder: string;
  selectSoilPlaceholder: string;
  selectWaterPlaceholder: string;
  locationDetectedPrefix: string;
  locationDeniedMessage: string;
  locationFetchError: string;
  locationRequiredPrompt: string;
  manualSoilHeader: string;
  manualSoilNotice: string;
  valEnterNitrogen: string;
  valEnterPhosphorus: string;
  valEnterPotassium: string;
  valEnterPh: string;
  valSelectState: string;
  valSelectDistrict: string;
  valSelectSoil: string;
  weatherLiveHeading: string;
  weatherUnavailable: string;
  weatherRefreshing: string;
  changeLocation: string;
  liveGpsTag: string;
}

export const TRANSLATIONS: Record<string, TranslationDictionary> = {
  en: {
    appTitle: "CROPAPP",
    appSubtitle: "AI-Powered Crop & Fertilizer Recommendation System",
    navHome: "Home",
    navDashboard: "Dashboard",
    navSoilRec: "Soil Test Recommendation",
    navRegionRec: "Region Advisory",
    navFertilizer: "Fertilizer Advisory",
    navSoilHealth: "Soil Health",
    navWeather: "Farm Weather",
    navCrops: "Crop Directory",
    navCompare: "Compare Crops",
    navHistory: "History",
    getStarted: "Start Recommendation",
    speakToApp: "Voice Assistant",
    listening: "Listening... Speak now",
    stopListening: "Stop Voice",
    listenAudio: "Listen",
    stopAudio: "Stop",
    nitrogen: "Nitrogen [mg/kg]",
    phosphorus: "Phosphorus [mg/kg]",
    potassium: "Potassium [mg/kg]",
    ph: "Soil pH Level",
    temperature: "Temperature (°C)",
    humidity: "Humidity (%)",
    rainfall: "Rainfall (mm)",
    state: "State",
    district: "District",
    soilType: "Soil Type",
    waterAvailability: "Water Availability",
    previousCrop: "Previous Crop",
    useMyLocation: "Use My Current Location",
    locating: "Detecting Device Location...",
    getRecommendation: "Analyze & Recommend",
    recommendedCrop: "Recommended Crop",
    suitabilityScore: "Agronomic Suitability",
    alternativeCrops: "Alternative Suitable Crops",
    fertilizerAdvisory: "Nutrient & Fertilizer Guidance",
    soilHealthReport: "Soil Health Status",
    farmingAdvice: "Farmer Advisory",
    deficient: "Deficient",
    optimal: "Optimal",
    excess: "Excess",
    printReport: "Print Advisory Report",
    estimatedNotice: "Notice: Based on regional agronomic parameters.",
    clearHistory: "Clear History",

    selectStatePlaceholder: "Select State",
    selectDistrictPlaceholder: "Select District",
    selectSoilPlaceholder: "Select Soil Type",
    selectWaterPlaceholder: "Select Water Level",
    locationDetectedPrefix: "Current Location Detected:",
    locationDeniedMessage: "Location access was denied. Please select your State and District manually below.",
    locationFetchError: "Unable to retrieve device GPS coordinates. Please select manually.",
    locationRequiredPrompt: "Please detect or select your farm location.",
    manualSoilHeader: "Manual Soil Test Input",
    manualSoilNotice: "Enter the exact values from your laboratory Soil Health Card. Voice input is disabled for numerical precision.",
    valEnterNitrogen: "Please enter the Nitrogen (N) value from your soil test (0-250 mg/kg).",
    valEnterPhosphorus: "Please enter the Phosphorus (P) value from your soil test (0-250 mg/kg).",
    valEnterPotassium: "Please enter the Potassium (K) value from your soil test (0-250 mg/kg).",
    valEnterPh: "Please enter the Soil pH value (between 3.5 and 9.5).",
    valSelectState: "Please select your State.",
    valSelectDistrict: "Please select your District.",
    valSelectSoil: "Please select your Soil Type.",
    weatherLiveHeading: "Live Farm Weather",
    weatherUnavailable: "Live meteorological data is currently unavailable for this location.",
    weatherRefreshing: "Updating weather data...",
    changeLocation: "Change Location",
    liveGpsTag: "GPS Detected"
  },

  te: {
    appTitle: "క్రాప్‌యాప్",
    appSubtitle: "రైతుల కోసం ఏఐ పంట & ఎరువుల సిఫార్సు వ్యవస్థ",
    navHome: "హోమ్",
    navDashboard: "రైతు డాష్‌బోర్డ్",
    navSoilRec: "మట్టి పరీక్ష సిఫార్సు",
    navRegionRec: "ప్రాంతీయ విధానం",
    navFertilizer: "ఎరువుల సలహా",
    navSoilHealth: "నేల ఆరోగ్యం",
    navWeather: "వాతావరణం",
    navCrops: "పంటల జాబితా",
    navCompare: "పంటల పోలిక",
    navHistory: "చరిత్ర",
    getStarted: "సిఫార్సు ప్రారంభించండి",
    speakToApp: "వాయిస్ అసిస్టెంట్",
    listening: "వింటున్నాము... మాట్లాడండి",
    stopListening: "వాయిస్ ఆపు",
    listenAudio: "వినండి",
    stopAudio: "ఆపు",
    nitrogen: "నత్రజని [మి.గ్రా/కి.గ్రా]",
    phosphorus: "భాస్వరం [మి.గ్రా/కి.గ్రా]",
    potassium: "పొటాషియం [మి.గ్రా/కి.గ్రా]",
    ph: "నేల పిహెచ్ స్థాయి",
    temperature: "ఉష్ణోగ్రత (°C)",
    humidity: "తేమ శాతం (%)",
    rainfall: "వర్షపాతం (మి.మీ)",
    state: "రాష్ట్రం",
    district: "జిల్లా",
    soilType: "నేల రకం",
    waterAvailability: "నీటి లభ్యత",
    previousCrop: "మునుపటి పంట",
    useMyLocation: "నా ప్రస్తుత లొకేషన్ ఉపయోగించండి",
    locating: "లొకేషన్ శోధిస్తోంది...",
    getRecommendation: "విశ్లేషించి సిఫార్సు పొందండి",
    recommendedCrop: "సిఫార్సు చేయబడిన పంట",
    suitabilityScore: "అనుకూలత స్కోరు",
    alternativeCrops: "ప్రత్యామ్నాయ అనువైన పంటలు",
    fertilizerAdvisory: "ఎరువుల మార్గదర్శకత్వం",
    soilHealthReport: "నేల ఆరోగ్య నివేదిక",
    farmingAdvice: "రైతులకు సలహాలు",
    deficient: "లోపం",
    optimal: "సరిపడా",
    excess: "అధికం",
    printReport: "నివేదిక ముద్రించండి",
    estimatedNotice: "గమనిక: ప్రాంతీయ వ్యవసాయ ప్రామాణిక పారామితుల ఆధారంగా.",
    clearHistory: "చరిత్రను తొలగించండి",

    selectStatePlaceholder: "రాష్ట్రం ఎంచుకోండి",
    selectDistrictPlaceholder: "జిల్లా ఎంచుకోండి",
    selectSoilPlaceholder: "నేల రకం ఎంచుకోండి",
    selectWaterPlaceholder: "నీటి లభ్యత ఎంచుకోండి",
    locationDetectedPrefix: "గుర్తించిన ప్రస్తుత ప్రాంతం:",
    locationDeniedMessage: "లొకేషన్ అనుమతి నిరాకరించబడింది. దయచేసి క్రింద మీ రాష్ట్రం మరియు జిల్లాను ఎంచుకోండి.",
    locationFetchError: "పరికరం జిపిఎస్ లొకేషన్ పొందలేకపోయాము. దయచేసి క్రింద ఎంచుకోండి.",
    locationRequiredPrompt: "దయచేసి మీ వ్యవసాయ ప్రాంతాన్ని గుర్తించండి లేదా ఎంచుకోండి.",
    manualSoilHeader: "మట్టి పరీక్ష విలువల నమోదు",
    manualSoilNotice: "ఖచ్చితత్వం కోసం మీ మట్టి ఆరోగ్య పత్రంలోని విలువలను నమోదు చేయండి. సంఖ్యల ఖచ్చితత్వం కొరకు మైక్రోఫోన్ తొలగించబడింది.",
    valEnterNitrogen: "దయచేసి మీ మట్టి నివేదికలోని నత్రజని విలువను నమోదు చేయండి (0-250 మి.గ్రా/కి.గ్రా).",
    valEnterPhosphorus: "దయచేసి భాస్వరం విలువను నమోదు చేయండి (0-250 మి.గ్రా/కి.గ్రా).",
    valEnterPotassium: "దయచేసి పొటాషియం విలువను నమోదు చేయండి (0-250 మి.గ్రా/కి.గ్రా).",
    valEnterPh: "దయచేసి నేల పిహెచ్ విలువను నమోదు చేయండి (3.5 నుండి 9.5 మధ్య).",
    valSelectState: "దయచేసి మీ రాష్ట్రాన్ని ఎంచుకోండి.",
    valSelectDistrict: "దయచేసి మీ జిల్లాను ఎంచుకోండి.",
    valSelectSoil: "దయచేసి మీ నేల రకాన్ని ఎంచుకోండి.",
    weatherLiveHeading: "ప్రత్యక్ష వాతావరణం",
    weatherUnavailable: "ఈ ప్రాంతానికి ప్రత్యక్ష వాతావరణ సమాచారం అందుబాటులో లేదు.",
    weatherRefreshing: "వాతావరణ సమాచారం తాజాకరిస్తోంది...",
    changeLocation: "ప్రాంతం మార్చండి",
    liveGpsTag: "జిపిఎస్ ద్వారా"
  },

  hi: {
    appTitle: "क्रॉपऐप",
    appSubtitle: "किसानों के लिए एआई फसल एवं उर्वरक अनुशंसा प्रणाली",
    navHome: "होम",
    navDashboard: "किसान डैशबोर्ड",
    navSoilRec: "मृदा परीक्षण अनुशंसा",
    navRegionRec: "क्षेत्रीय सलाह",
    navFertilizer: "उर्वरक सलाह",
    navSoilHealth: "मृदा स्वास्थ्य",
    navWeather: "खेत का मौसम",
    navCrops: "फसल निर्देशिका",
    navCompare: "फसलों की तुलना",
    navHistory: "इतिहास",
    getStarted: "अनुशंसा शुरू करें",
    speakToApp: "आवाज सहायक",
    listening: "सुन रहे हैं... कृपया बोलें",
    stopListening: "आवाज बंद करें",
    listenAudio: "सुनें",
    stopAudio: "रोकें",
    nitrogen: "नाइट्रोजन [मि.ग्रा./किग्रा]",
    phosphorus: "फास्फोरस [मि.ग्रा./किग्रा]",
    potassium: "पोटाश [मि.ग्रा./किग्रा]",
    ph: "मृदा पीएच मान",
    temperature: "तापमान (°C)",
    humidity: "नमी (%)",
    rainfall: "वर्षा (मिमी)",
    state: "राज्य",
    district: "जिला",
    soilType: "मिट्टी का प्रकार",
    waterAvailability: "जल उपलब्धता",
    previousCrop: "पिछली फसल",
    useMyLocation: "मेरा वर्तमान स्थान उपयोग करें",
    locating: "स्थान खोजा जा रहा है...",
    getRecommendation: "विश्लेषण करें और अनुशंसा पाएं",
    recommendedCrop: "अनुशंसित सर्वोत्तम फसल",
    suitabilityScore: "अनुकूलता स्कोर",
    alternativeCrops: "वैकल्पिक उपयुक्त फसलें",
    fertilizerAdvisory: "पोषक तत्व एवं खाद मार्गदर्शन",
    soilHealthReport: "मिट्टी स्वास्थ्य स्थिति",
    farmingAdvice: "किसान भाइयों के लिए सलाह",
    deficient: "कमी",
    optimal: "पर्याप्त",
    excess: "अधिकता",
    printReport: "सलाह रिपोर्ट प्रिंट करें",
    estimatedNotice: "सूचना: क्षेत्रीय मानक कृषि मापदंडों के आधार पर।",
    clearHistory: "इतिहास साफ करें",

    selectStatePlaceholder: "राज्य चुनें",
    selectDistrictPlaceholder: "जिला चुनें",
    selectSoilPlaceholder: "मिट्टी का प्रकार चुनें",
    selectWaterPlaceholder: "जल स्तर चुनें",
    locationDetectedPrefix: "पहचाना गया वर्तमान स्थान:",
    locationDeniedMessage: "स्थान अनुमति अस्वीकृत कर दी गई। कृपया नीचे अपना राज्य और जिला चुनें।",
    locationFetchError: "डिवाइस जीपीएस स्थान प्राप्त नहीं हो सका। कृपया मैन्युअल रूप से चुनें।",
    locationRequiredPrompt: "कृपया अपना खेत स्थान पहचानें या चुनें।",
    manualSoilHeader: "मृदा परीक्षण वास्तविक मान दर्ज करें",
    manualSoilNotice: "सटीकता के लिए अपने मृदा स्वास्थ्य कार्ड के वास्तविक मान दर्ज करें। संख्यात्मक शुद्धता हेतु माइक्रोफोन हटाया गया है।",
    valEnterNitrogen: "कृपया अपनी मृदा रिपोर्ट से नाइट्रोजन का मान दर्ज करें (0-250 मि.ग्रा./किग्रा)।",
    valEnterPhosphorus: "कृपया फास्फोरस का मान दर्ज करें (0-250 मि.ग्रा./किग्रा)।",
    valEnterPotassium: "कृपया पोटाश का मान दर्ज करें (0-250 मि.ग्रा./किग्रा)।",
    valEnterPh: "कृपया मृदा पीएच मान दर्ज करें (3.5 से 9.5 के बीच)।",
    valSelectState: "कृपया अपना राज्य चुनें।",
    valSelectDistrict: "कृपया अपना जिला चुनें।",
    valSelectSoil: "कृपया मिट्टी का प्रकार चुनें।",
    weatherLiveHeading: "खेत का लाइव मौसम",
    weatherUnavailable: "इस स्थान के लिए वर्तमान मौसम उपलब्ध नहीं है।",
    weatherRefreshing: "मौसम डेटा अपडेट हो रहा है...",
    changeLocation: "स्थान बदलें",
    liveGpsTag: "जीपीएस द्वारा"
  }
};

export function getTranslation(lang: LanguageCode): TranslationDictionary {
  if (TRANSLATIONS[lang]) {
    return TRANSLATIONS[lang];
  }
  return TRANSLATIONS.en;
}
