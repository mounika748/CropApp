import { LanguageCode } from '../types';

export interface LocalizedCropInfo {
  name: string;
  category: string;
  season: string;
  waterRequirement: string;
  soilTypes: string[];
  description: string;
  growingTips: string[];
  fertilizerNeeds: string;
}

const CROP_TRANSLATIONS: Record<string, Record<'en' | 'te' | 'hi', LocalizedCropInfo>> = {
  rice: {
    en: {
      name: "Rice",
      category: "Cereals",
      season: "Kharif",
      waterRequirement: "High",
      soilTypes: ["Clay", "Clay Loam", "Alluvial", "Black Soil"],
      description: "Principal staple food crop requiring standing water and warm subtropical climate.",
      growingTips: [
        "Maintain 3-5 cm standing water during tillering to panicle initiation.",
        "Apply Nitrogen in split doses: basal, active tillering, and panicle emergence.",
        "Practice SRI (System of Rice Intensification) for water conservation."
      ],
      fertilizerNeeds: "High nitrogen consumer; responds strongly to Urea top-dressing and basal DAP application."
    },
    te: {
      name: "వరి",
      category: "ధాన్యాలు",
      season: "ఖరీఫ్",
      waterRequirement: "ఎక్కువ",
      soilTypes: ["బంక నేల", "బంక బంక నేల", "ఒండ్రు నేల", "నల్లరేగడి నేల"],
      description: "వరి భారతదేశ ప్రధాన ఆహార పంట. ఇది ఎక్కువ తేమ, నిల్వ ఉండే నీరు మరియు వేడి వాతావరణంలో బాగా పండుతుంది.",
      growingTips: [
        "పిలకలు వేసే దశ నుండి వెన్ను దశ వరకు పొలంలో 3-5 సెం.మీ నీరు నిల్వ ఉంచాలి.",
        "నత్రజనిని దఫాలుగా వేయాలి: దుక్కిలో, పిలక దశలో మరియు చిరుపొట్ట దశలో.",
        "నీటి ఆదా కోసం శ్రీ వరి సాగు పద్ధతిని పాటించండి."
      ],
      fertilizerNeeds: "నత్రజని ఎక్కువగా అవసరం; యూరియా మరియు డిఎపిని సమతుల్యంగా వాడాలి."
    },
    hi: {
      name: "धान",
      category: "अनाज",
      season: "खरीफ",
      waterRequirement: "अधिक",
      soilTypes: ["चिकनी मिट्टी", "दोमट चिकनी मिट्टी", "जलोढ़ मिट्टी", "काली मिट्टी"],
      description: "धान भारत की प्रमुख खाद्यान्न फसल है, जो अधिक नमी और खड़े पानी में अच्छी पैदावार देती है।",
      growingTips: [
        "कल्ले फूटने से लेकर बाली निकलने तक खेत में 3-5 सेमी पानी बनाए रखें।",
        "नाइट्रोजन का छिड़काव तीन किस्तों में करें: बुवाई के समय, कल्ले निकलते समय और बाली बनते समय।",
        "जल संरक्षण के लिए श्री विधि अपनाएं।"
      ],
      fertilizerNeeds: "नाइट्रोजन की अधिक आवश्यकता; यूरिया की टॉप ड्रेसिंग और बुवाई के समय डीएपी का उपयोग करें।"
    }
  },
  wheat: {
    en: {
      name: "Wheat",
      category: "Cereals",
      season: "Rabi",
      waterRequirement: "Medium",
      soilTypes: ["Loam", "Alluvial", "Clay Loam"],
      description: "Major Rabi staple grain cultivated in cool vegetative periods and warm ripening weather.",
      growingTips: [
        "First irrigation at Crown Root Initiation (20-25 days after sowing) is critical.",
        "Treat seed with Trichoderma or Carbendazim before sowing.",
        "Avoid excess nitrogen during late stage to prevent lodging."
      ],
      fertilizerNeeds: "Balanced NPK application with zinc sulphate supplementation."
    },
    te: {
      name: "గోధుమ",
      category: "ధాన్యాలు",
      season: "రబీ",
      waterRequirement: "మితమైన",
      soilTypes: ["గడ్డి నేల", "ఒండ్రు నేల", "బంక బంక నేల"],
      description: "రబీ కాలంలో పండించే ముఖ్యమైన ధాన్యపు పంట. చల్లని వాతావరణంలో బాగా పెరుగుతుంది.",
      growingTips: [
        "విత్తిన 20-25 రోజులకు కిరీట వేర్లు ఏర్పడే దశలో మొదటి తడి ఇవ్వడం చాలా ముఖ్యం.",
        "విత్తే ముందు విత్తన శుద్ధి తప్పనిసరిగా చేయాలి.",
        "పైరు పడిపోకుండా ఉండటానికి ఆఖరి దశలో అధిక నత్రజని వాడకూడదు."
      ],
      fertilizerNeeds: "సమతుల్య ఎన్-పి-కె ఎరువులు మరియు జింక్ సల్ఫేట్ అవసరం."
    },
    hi: {
      name: "गेहूं",
      category: "अनाज",
      season: "रबी",
      waterRequirement: "मध्यम",
      soilTypes: ["दोमट", "जलोढ़", "चिकनी दोमट"],
      description: "रबी मौसम की प्रमुख खाद्यान्न फसल, जिसे ठंडी जलवायु और पकते समय शुष्क धूप की आवश्यकता होती है।",
      growingTips: [
        "बुवाई के 20-25 दिन बाद पहली सिंचाई (ताज जड़ अवस्था) अति आवश्यक है।",
        "बुवाई से पूर्व बीज उपचार अवश्य करें।",
        "फसल गिरने से बचाने के लिए अंतिम अवस्था में अत्यधिक यूरिया न डालें।"
      ],
      fertilizerNeeds: "संतुलित एनपीके और जिंक सल्फेट का उपयोग करें।"
    }
  },
  maize: {
    en: {
      name: "Maize",
      category: "Cereals",
      season: "Kharif",
      waterRequirement: "Medium",
      soilTypes: ["Deep Loamy", "Alluvial", "Red Loam"],
      description: "Versatile industrial and food cereal crop requiring well-drained fertile soils.",
      growingTips: [
        "Prevent waterlogging as maize roots are sensitive to stagnant water.",
        "Ensure moisture availability during tasseling and silking stages.",
        "Control fall armyworm with timely pheromone traps and biopesticides."
      ],
      fertilizerNeeds: "Heavy feeder of nitrogen and potash; split urea application in 3 phases."
    },
    te: {
      name: "మొక్కజొన్న",
      category: "ధాన్యాలు",
      season: "ఖరీఫ్",
      waterRequirement: "మితమైన",
      soilTypes: ["లోతైన నేలలు", "ఒండ్రు నేల", "ఎర్ర నేల"],
      description: "మంచి నీటి పారుదల గల నేలల్లో బాగా పండే బహుళ ప్రయోజన ఆహార పంట.",
      growingTips: [
        "నీరు నిల్వ ఉండకుండా చూసుకోవాలి; మొక్కజొన్న వేర్లు నీటి నిల్వను తట్టుకోలేవు.",
        "కంకి మరియు పూత దశలలో తేమ ఉండేలా చూడాలి.",
        "కత్తెర పురుగు నివారణకు సకాలంలో చర్యలు తీసుకోవాలి."
      ],
      fertilizerNeeds: "నత్రజని మరియు పొటాష్ ఎక్కువగా అవసరం; యూరియాను మూడు దఫాలుగా వేయాలి."
    },
    hi: {
      name: "मक्का",
      category: "अनाज",
      season: "खरीफ",
      waterRequirement: "मध्यम",
      soilTypes: ["गहरी दोमट", "जलोढ़", "लाल दोमट"],
      description: "बहुउपयोगी खाद्यान्न व औद्योगिक फसल जिसे अच्छी जल निकासी वाली भूमि चाहिए।",
      growingTips: [
        "खेत में जलभराव न होने दें; मक्का की जड़ें जलभराव सहन नहीं कर पातीं।",
        "मंजरी और भुट्टा बनते समय नमी बनाए रखें।",
        "फॉल आर्मीवर्म कीट की रोकथाम हेतु समय पर जैव कीटनाशक का उपयोग करें।"
      ],
      fertilizerNeeds: "नाइट्रोजन और पोटाश की अधिक आवश्यकता; यूरिया को 3 भागों में बांटकर दें।"
    }
  },
  cotton: {
    en: {
      name: "Cotton",
      category: "Commercial",
      season: "Kharif",
      waterRequirement: "Medium",
      soilTypes: ["Black Cotton Soil", "Deep Alluvial"],
      description: "White gold commercial cash crop thriving in deep black soils with good moisture retention.",
      growingTips: [
        "Maintain spacing of 90 x 45 cm for robust boll formation.",
        "Monitor pink bollworm with delta pheromone traps.",
        "Spray 1% magnesium sulphate to prevent leaf reddening."
      ],
      fertilizerNeeds: "Moderate nitrogen with high potassium during boll development."
    },
    te: {
      name: "పత్తి",
      category: "వాణిజ్య పంటలు",
      season: "ఖరీఫ్",
      waterRequirement: "మితమైన",
      soilTypes: ["నల్లరేగడి నేల", "లోతైన ఒండ్రు నేల"],
      description: "తెల్ల బంగారం అని పిలువబడే ప్రధాన వాణిజ్య పంట. నల్లరేగడి నేలల్లో అద్భుతంగా పండుతుంది.",
      growingTips: [
        "కాయలు బాగా రావడానికి తగినంత దూరం (90 x 45 సెం.మీ) పాటించాలి.",
        "గులాబీ రంగు కాయతొలుచు పురుగు నివారణకు లింగాకర్షక బుట్టలు పెట్టాలి.",
        "ఆకులు ఎర్రబడకుండా మెగ్నీషియం సల్ఫేట్ పిచికారీ చేయాలి."
      ],
      fertilizerNeeds: "కాయ దశలో పొటాషియం మరియు నత్రజని సమతుల్యంగా వేయాలి."
    },
    hi: {
      name: "कपास",
      category: "व्यावसायिक फसलें",
      season: "खरीफ",
      waterRequirement: "मध्यम",
      soilTypes: ["काली मिट्टी", "गहरी जलोढ़"],
      description: "सफेद सोना कही जाने वाली मुख्य नकदी फसल जो गहरी काली मिट्टी में खूब फलती-फूलती है।",
      growingTips: [
        "टिंडे अच्छे बनने के लिए उचित दूरी बनाए रखें।",
        "गुलाबी सुंडी की निगरानी हेतु फेरोमोन ट्रैप लगाएं।",
        "पत्तियां लाल होने से रोकने के लिए मैग्नीशियम सल्फेट का छिड़काव करें।"
      ],
      fertilizerNeeds: "टिंडे बनते समय पोटाश और नाइट्रोजन का संतुलित उपयोग करें।"
    }
  },
  sugarcane: {
    en: {
      name: "Sugarcane",
      category: "Commercial",
      season: "Whole Year",
      waterRequirement: "High",
      soilTypes: ["Deep Loamy", "Black Soil", "Alluvial"],
      description: "Long-duration cash crop requiring heavy irrigation and ample sunshine.",
      growingTips: [
        "Plant setts with 2-3 healthy buds treated with fungicide.",
        "Carry out earthing up operation at 90 and 120 days to prevent lodging.",
        "Apply trash mulching to conserve root zone moisture."
      ],
      fertilizerNeeds: "Heavy nutrient consumer requiring high Nitrogen split applications and Potash."
    },
    te: {
      name: "చెరకు",
      category: "వాణిజ్య పంటలు",
      season: "ఏడాది పొడవునా",
      waterRequirement: "ఎక్కువ",
      soilTypes: ["లోతైన గడ్డి నేలలు", "నల్లరేగడి నేల", "ఒండ్రు నేల"],
      description: "ఎక్కువ నీటి సదుపాయం మరియు ఎండ అవసరమైన దీర్ఘకాలిక వాణిజ్య పంట.",
      growingTips: [
        "ఆరోగ్యకరమైన మొగ్గలున్న విత్తన ముక్కలను విత్తన శుద్ధి చేసి నాటాలి.",
        "పైరు పడిపోకుండా 90 మరియు 120 రోజులకు మట్టిని గట్లకు ఎగదోయాలి.",
        "చెరకు పిప్పి లేదా ఆకులతో నేలమీద ఆచ్ఛాదన వేసి తేమను కాపాడుకోవాలి."
      ],
      fertilizerNeeds: "నత్రజని మరియు పొటాష్ ఎరువులు ఎక్కువగా అవసరం."
    },
    hi: {
      name: "गन्ना",
      category: "व्यावसायिक फसलें",
      season: "पूरे वर्ष",
      waterRequirement: "अधिक",
      soilTypes: ["गहरी दोमट", "काली मिट्टी", "जलोढ़"],
      description: "लंबी अवधि की नकदी फसल जिसे प्रचुर सिंचाई और धूप की आवश्यकता होती है।",
      growingTips: [
        "स्वस्थ और उपचारित टुकड़ों की ही बुवाई करें।",
        "फसल को गिरने से बचाने के लिए समय पर मिट्टी चढ़ाएं।",
        "नमी बचाने के लिए सूखी पत्तियों की पलवार (मल्चिंग) करें।"
      ],
      fertilizerNeeds: "नाइट्रोजन और पोटाश की प्रचुर आवश्यकता होती है।"
    }
  },
  chickpea: {
    en: {
      name: "Chickpea",
      category: "Pulses",
      season: "Rabi",
      waterRequirement: "Low",
      soilTypes: ["Well-drained Black Soil", "Sandy Loam", "Clay Loam"],
      description: "Vital pulse crop fixing atmospheric nitrogen and excelling in dry, cool climates.",
      growingTips: [
        "Inoculate seeds with Rhizobium culture before sowing.",
        "Perform nipping at 30-35 days to promote profuse branching.",
        "Avoid heavy irrigation during flowering to prevent flower drop."
      ],
      fertilizerNeeds: "Low nitrogen requirement; benefits from basal DAP and biofertilizers."
    },
    te: {
      name: "శనగలు",
      category: "పప్పుదినుసులు",
      season: "రబీ",
      waterRequirement: "తక్కువ",
      soilTypes: ["మురుగు నీరు పోయే నల్లరేగడి నేల", "ఇసుక నేల", "బంక నేల"],
      description: "వాతావరణంలోని నత్రజనిని నేలలో స్థిరీకరించే ముఖ్యమైన రబీ పప్పు పంట.",
      growingTips: [
        "విత్తే ముందు రైజోబియం కల్చర్‌తో విత్తన శుద్ధి చేయాలి.",
        "కొమ్మలు బాగా రావడానికి 30-35 రోజుల వయసులో పై చిగుళ్లను తుంచాలి.",
        "పూత దశలో అధిక నీటి తడి ఇవ్వకూడదు."
      ],
      fertilizerNeeds: "నత్రజని తక్కువగా సరిపోతుంది; భాస్వరం మరియు జీవన ఎరువులు వేయాలి."
    },
    hi: {
      name: "चना",
      category: "दलहन",
      season: "रबी",
      waterRequirement: "कम",
      soilTypes: ["जल निकास वाली काली मिट्टी", "बलुई दोमट", "चिकनी दोमट"],
      description: "हवा से नाइट्रोजन स्थिर करने वाली मुख्य रबी दलहनी फसल जो कम पानी में भी अच्छी उपज देती है।",
      growingTips: [
        "राइजोबियम कल्चर से बीज उपचार अवश्य करें।",
        "अधिक शाखाओं के लिए 30-35 दिन पर ऊपरी सिरे तोड़ें (निपिंग करें)।",
        "फूल आने के समय भारी सिंचाई से बचें।"
      ],
      fertilizerNeeds: "नाइट्रोजन की कम आवश्यकता; बुवाई के समय डीएपी और जैव उर्वरक दें।"
    }
  },
  pigeonpeas: {
    en: {
      name: "Pigeon Pea",
      category: "Pulses",
      season: "Kharif",
      waterRequirement: "Low",
      soilTypes: ["Deep Loamy", "Black Soil", "Red Soil"],
      description: "Deep-rooted drought-resilient pulse restoring deep soil health and fertility.",
      growingTips: [
        "Suitable for intercropping with cotton, sorghum, or groundnut.",
        "Maintain good soil aeration in early vegetative phase.",
        "Spray neem extract at flower bud initiation against pod borer."
      ],
      fertilizerNeeds: "Basal DAP with sulphur supplementation; no top-dressed nitrogen needed."
    },
    te: {
      name: "కందులు",
      category: "పప్పుదినుసులు",
      season: "ఖరీఫ్",
      waterRequirement: "తక్కువ",
      soilTypes: ["లోతైన గడ్డి నేలలు", "నల్లరేగడి నేల", "ఎర్ర నేల"],
      description: "లోతైన వేరు వ్యవస్థ కలిగి కరువును తట్టుకునే ముఖ్యమైన పప్పుదినుసుల పంట.",
      growingTips: [
        "పత్తి లేదా వేరుశనగతో అంతర పంటగా సాగు చేయడానికి చాలా అనుకూలం.",
        "నీరు నిల్వ ఉండకుండా చూసుకోవాలి.",
        "కాయతొలుచు పురుగు నివారణకు వేపనూనె లేదా తగిన మందులను పిచికారీ చేయాలి."
      ],
      fertilizerNeeds: "దుక్కిలో డిఎపి మరియు గంధకం వేయాలి; పైపాటుగా యూరియా అవసరం లేదు."
    },
    hi: {
      name: "अरहर",
      category: "दलहन",
      season: "खरीफ",
      waterRequirement: "कम",
      soilTypes: ["गहरी दोमट", "काली मिट्टी", "लाल मिट्टी"],
      description: "गहरी जड़ों वाली सूखा-रोधी दलहनी फसल जो भूमि की उर्वरता बढ़ाती है।",
      growingTips: [
        "कपास या मूंगफली के साथ अंतःफसल के लिए उत्तम।",
        "खेत में जलभराव बिल्कुल न होने दें।",
        "फली छेदक कीट से बचाव हेतु नीम के तेल का छिड़काव करें।"
      ],
      fertilizerNeeds: "बुवाई पर डीएपी और सल्फर दें; ऊपर से यूरिया देने की आवश्यकता नहीं है।"
    }
  },
  kidneybeans: {
    en: {
      name: "Kidney Beans",
      category: "Pulses",
      season: "Rabi",
      waterRequirement: "Medium",
      soilTypes: ["Rich Well-drained Loam", "Sandy Loam"],
      description: "High-protein pulse demanding cool weather and fertile, neutral pH soils.",
      growingTips: [
        "Ensure uniform sowing depth of 4-5 cm in well-pulverized seedbed.",
        "Unlike other pulses, rajma cannot fix atmospheric nitrogen and needs starter N.",
        "Irrigate at flowering and pod filling stages."
      ],
      fertilizerNeeds: "Requires explicit basal Nitrogen (80-100 kg/ha) unlike other pulses."
    },
    te: {
      name: "రాజ్మా",
      category: "పప్పుదినుసులు",
      season: "రబీ",
      waterRequirement: "మితమైన",
      soilTypes: ["సారవంతమైన గడ్డి నేల", "ఇసుక నేల"],
      description: "అధిక ప్రోటీన్ కలిగిన చల్లని వాతావరణంలో పండే పోషకభరితమైన పప్పు పంట.",
      growingTips: [
        "విత్తనాలను 4-5 సెం.మీ లోతులో సమానంగా విత్తుకోవాలి.",
        "రాజ్మాకు సహజ నత్రజని స్థిరీకరణ తక్కువ కాబట్టి దుక్కిలో నత్రజని అవసరం.",
        "పూత మరియు గింజ పాలుపోసుకునే దశలో తడులు ఇవ్వాలి."
      ],
      fertilizerNeeds: "దుక్కిలో నత్రజని, భాస్వరం మరియు పొటాష్ సరిపడా వేయాలి."
    },
    hi: {
      name: "राजमा",
      category: "दलहन",
      season: "रबी",
      waterRequirement: "मध्यम",
      soilTypes: ["उपजाऊ दोमट", "बलुई दोमट"],
      description: "ठंडी जलवायु में उगने वाली उच्च प्रोटीन युक्त पौष्टिक दाल।",
      growingTips: [
        "बीज को 4-5 सेमी की गहराई पर बोएं।",
        "राजमा वायुमंडलीय नाइट्रोजन स्थिर नहीं कर पाता, अतः इसे नाइट्रोजन खाद अवश्य दें।",
        "फूल आते समय और फली बनते समय सिंचाई अवश्य करें।"
      ],
      fertilizerNeeds: "अन्य दालों की तुलना में इसे 80-100 किग्रा नाइट्रोजन प्रति हेक्टेयर चाहिए।"
    }
  },
  mungbean: {
    en: {
      name: "Mung Bean",
      category: "Pulses",
      season: "Kharif",
      waterRequirement: "Low",
      soilTypes: ["Sandy Loam", "Alluvial", "Clay Loam"],
      description: "Short-duration pulse ideal for crop rotation, green manuring, and soil enrichment.",
      growingTips: [
        "Harvest pods when 80% turn dark brown to prevent shattering.",
        "Control whitefly early to prevent yellow mosaic virus.",
        "Incorporate residue into soil post-harvest to enrich organic carbon."
      ],
      fertilizerNeeds: "Low nutrient requirement; 20 kg N and 40 kg P2O5 basal application."
    },
    te: {
      name: "పెసలు",
      category: "పప్పుదినుసులు",
      season: "ఖరీఫ్",
      waterRequirement: "తక్కువ",
      soilTypes: ["ఇసుక నేల", "ఒండ్రు నేల", "బంక నేల"],
      description: "స్వల్పకాలిక పప్పు పంట. నేల సారాన్ని పెంచడానికి మరియు పంటల మార్పిడికి చాలా అనువైనది.",
      growingTips: [
        "కాయలు 80% నల్లబడినప్పుడు కోయాలి; ఆలస్యమైతే కాయలు పగిలి రాలిపోతాయి.",
        "పల్లాకు తెగులు నివారణకు తెల్లదోమను అరికట్టాలి.",
        "పంట కోసిన తర్వాత మిగిలిన పైరును దుక్కిలో కలిపి దున్నాలి."
      ],
      fertilizerNeeds: "తక్కువ ఎరువులు చాలు; దుక్కిలో డిఎపి వేస్తే సరిపోతుంది."
    },
    hi: {
      name: "मूंग दाल",
      category: "दलहन",
      season: "खरीफ",
      waterRequirement: "कम",
      soilTypes: ["बलुई दोमट", "जलोढ़", "चिकनी दोमट"],
      description: "कम दिनों में तैयार होने वाली दलहनी फसल जो मिट्टी की उर्वरता बढ़ाती है।",
      growingTips: [
        "80% फलियां पकने पर कटाई कर लें ताकि दाने खेत में न बिखरें।",
        "पीला मोज़ेक वायरस से बचाव हेतु सफेद मक्खी की रोकथाम करें।",
        "कटाई के बाद अवशेषों को खेत में जुताई कर मिला दें।"
      ],
      fertilizerNeeds: "कम खाद की आवश्यकता; 20 किग्रा नाइट्रोजन और 40 किग्रा फास्फोरस दें।"
    }
  },
  blackgram: {
    en: {
      name: "Black Gram",
      category: "Pulses",
      season: "Kharif",
      waterRequirement: "Low",
      soilTypes: ["Black Loam", "Clay Loam", "Alluvial"],
      description: "Nutritious pulse widely grown as sole crop or relay crop in rice fallows.",
      growingTips: [
        "Ideal for broadcast sowing into standing rice stubbles (rice fallow pulses).",
        "Control powdery mildew with wettable sulphur spray if humidity is high.",
        "Maintain weed-free conditions up to 30 days."
      ],
      fertilizerNeeds: "Responds well to basal DAP and 2% DAP foliar spray at flowering."
    },
    te: {
      name: "మినుములు",
      category: "పప్పుదినుసులు",
      season: "ఖరీఫ్",
      waterRequirement: "తక్కువ",
      soilTypes: ["నల్లరేగడి నేల", "బంక నేల", "ఒండ్రు నేల"],
      description: "వరి మాగాణుల్లో పైరుగా మరియు ప్రధాన పప్పు పంటగా పండించే బలవర్ధకమైన పంట.",
      growingTips: [
        "వరి కోతకు ముందు మాగాణిలో వెదజల్లడానికి చాలా అనుకూలం.",
        "బూడిద తెగులు నివారణకు సల్ఫర్ మందును పిచికారీ చేయాలి.",
        "మొదటి 30 రోజులు కలుపు లేకుండా చూసుకోవాలి."
      ],
      fertilizerNeeds: "దుక్కిలో డిఎపి వేయడం మరియు పూత దశలో 2% డిఎపి ద్రావణం పిచికారీ చేయడం మంచిది."
    },
    hi: {
      name: "उड़द दाल",
      category: "दलहन",
      season: "खरीफ",
      waterRequirement: "कम",
      soilTypes: ["काली दोमट", "चिकनी दोमट", "जलोढ़"],
      description: "अति पौष्टिक दाल, जिसे धान की कटाई के बाद नमी वाले खेतों में भी उगाया जाता है।",
      growingTips: [
        "धान के बाद बिना जुताई भी इसे बोया जा सकता है।",
        "छाछिया (पाउडरी मिल्ड्यू) रोग से बचाव के लिए सल्फर का छिड़काव करें।",
        "शुरुआती 30 दिनों तक खेत को खरपतवार मुक्त रखें।"
      ],
      fertilizerNeeds: "डीएपी के साथ फूल आते समय 2% डीएपी का पर्णीय छिड़काव लाभप्रद है।"
    }
  },
  groundnut: {
    en: {
      name: "Groundnut",
      category: "Oilseeds",
      season: "Kharif",
      waterRequirement: "Medium",
      soilTypes: ["Sandy Loam", "Red Sandy", "Light Alluvial"],
      description: "Premier oilseed crop requiring friable, loose soils for smooth peg penetration.",
      growingTips: [
        "Soil must remain friable to allow easy penetration of pegs into the ground.",
        "Apply Gypsum (400 kg/ha) at flowering/pegging for bold, well-filled pods.",
        "Avoid waterlogging during maturity."
      ],
      fertilizerNeeds: "High Calcium and Sulphur requirement supplied through Gypsum alongside DAP."
    },
    te: {
      name: "వేరుశనగ",
      category: "నూనె గింజలు",
      season: "ఖరీఫ్",
      waterRequirement: "మితమైన",
      soilTypes: ["ఇసుక నేల", "ఎర్ర ఇసుక నేల", "తేలికపాటి ఒండ్రు నేల"],
      description: "ఊడలు సులభంగా నేలలోకి దిగడానికి గుల్లగా ఉండే తేలికపాటి నేలల్లో బాగా పండే నూనె గింజల పంట.",
      growingTips: [
        "ఊడలు నేలలోకి దిగడానికి నేల వదులుగా, గుల్లగా ఉండేలా చూసుకోవాలి.",
        "కాయలు బలిష్టంగా మారడానికి పూత మరియు ఊడ దిగే దశలో ఎకరాకు 200 కిలోల జిప్సం వేయాలి.",
        "పంట పక్వానికి వచ్చే సమయంలో నీరు నిల్వ ఉండకూడదు."
      ],
      fertilizerNeeds: "జిప్సం ద్వారా కాల్షియం మరియు గంధకం తప్పనిసరిగా అందించాలి."
    },
    hi: {
      name: "मूंगफली",
      category: "तिलहन",
      season: "खरीफ",
      waterRequirement: "मध्यम",
      soilTypes: ["बलुई दोमट", "लाल रेतीली", "हल्की जलोढ़"],
      description: "प्रमुख तिलहनी फसल जिसे सुइयां (पेग्स) जमीन में धंसने के लिए भुरभुरी मिट्टी चाहिए।",
      growingTips: [
        "मिट्टी भुरभुरी रखें ताकि सुइयां आसानी से मिट्टी में जा सकें।",
        "दाने भरने के लिए फूल/पेगिंग के समय 400 किग्रा/हेक्टेयर जिप्सम डालें।",
        "पकते समय खेत में पानी जमा न होने दें।"
      ],
      fertilizerNeeds: "जिप्सम के माध्यम से कैल्शियम व सल्फर की पूर्ति अति आवश्यक है।"
    }
  },
  chilli: {
    en: {
      name: "Chilli",
      category: "Spices",
      season: "Kharif",
      waterRequirement: "Medium",
      soilTypes: ["Black Soil", "Red Loam", "Sandy Loam"],
      description: "Pungent commercial spice demanding well-drained fertile soils and warm weather.",
      growingTips: [
        "Raise sturdy seedlings in nursery and transplant at 5-6 weeks.",
        "Control thrips and mites to prevent leaf curl disease.",
        "Spray micronutrient mixture at active flowering to prevent flower drop."
      ],
      fertilizerNeeds: "Heavy potassium consumer; apply balanced NPK in multiple top dressings."
    },
    te: {
      name: "మిరప",
      category: "సుగంధ ద్రవ్యాలు",
      season: "ఖరీఫ్",
      waterRequirement: "మితమైన",
      soilTypes: ["నల్లరేగడి నేల", "ఎర్ర నేల", "ఇసుక నేల"],
      description: "మంచి నీటి పారుదల మరియు వేడి వాతావరణం అవసరమైన ముఖ్యమైన వాణిజ్య మసాలా పంట.",
      growingTips: [
        "ఆరోగ్యకరమైన నారును పెంచి 5-6 వారాల వయసులో నాటాలి.",
        "బొబ్బర మరియు ఆకుముడుత తెగులు నివారణకు తామర పురుగులు, నల్లులను అరికట్టాలి.",
        "పూత రాలకుండా సూక్ష్మ పోషకాలను పిచికారీ చేయాలి."
      ],
      fertilizerNeeds: "పొటాషియం మరియు నత్రజనిని దఫాలుగా పైపాటుగా అందించాలి."
    },
    hi: {
      name: "मिर्च",
      category: "मसाले",
      season: "खरीफ",
      waterRequirement: "मध्यम",
      soilTypes: ["काली मिट्टी", "लाल दोमट", "बलुई दोमट"],
      description: "प्रमुख नकदी मसाला फसल जिसे जल निकासी वाली उपजाऊ भूमि और गर्म मौसम चाहिए।",
      growingTips: [
        "स्वस्थ नर्सरी तैयार कर 5-6 सप्ताह की पौध रोपें।",
        "मुर्रैया (पत्ती मरोड़) रोग से बचाव के लिए थ्रिप्स और माइट्स की रोकथाम करें।",
        "फूल झड़ने से रोकने के लिए सूक्ष्म पोषक तत्वों का छिड़काव करें।"
      ],
      fertilizerNeeds: "पोटाश और नाइट्रोजन की अधिक आवश्यकता; कई किस्तों में खाद दें।"
    }
  },
  tomato: {
    en: {
      name: "Tomato",
      category: "Vegetables",
      season: "Rabi",
      waterRequirement: "Medium",
      soilTypes: ["Sandy Loam", "Clay Loam", "Red Soil"],
      description: "High-demand commercial vegetable yielding abundantly in warm, sunny weather.",
      growingTips: [
        "Stake plants with bamboo sticks to prevent soil contact and rot.",
        "Mulch with silver-black polyethylene film to conserve moisture and suppress weeds.",
        "Prevent blossom end rot by ensuring adequate calcium and consistent watering."
      ],
      fertilizerNeeds: "Balanced NPK with regular calcium nitrate and boron foliar applications."
    },
    te: {
      name: "టమాటా",
      category: "కూరగాయలు",
      season: "రబీ",
      waterRequirement: "మితమైన",
      soilTypes: ["ఇసుక నేల", "బంక నేల", "ఎర్ర నేల"],
      description: "మంచి గిరాకీ ఉన్న కూరగాయల పంట. ఎండ మరియు చల్లని వాతావరణంలో పుష్కలంగా దిగుబడి ఇస్తుంది.",
      growingTips: [
        "కాయలు నేలకు తగలకుండా కర్రలతో ఊతం (స్టేకింగ్) ఇవ్వాలి.",
        "తేమను కాపాడటానికి మరియు కలుపు నివారణకు మల్చింగ్ షీట్ ఉపయోగించాలి.",
        "కాయ వెనుక భాగం నల్లబడకుండా కాల్షియం మరియు నిరంతర నీటి తడులు అందించాలి."
      ],
      fertilizerNeeds: "సమతుల్య ఎన్-పి-కె తో పాటు కాల్షియం నైట్రేట్ మరియు బోరాన్ అందించాలి."
    },
    hi: {
      name: "टमाटर",
      category: "सब्जियां",
      season: "रबी",
      waterRequirement: "मध्यम",
      soilTypes: ["बलुई दोमट", "चिकनी दोमट", "लाल मिट्टी"],
      description: "अधिक मांग वाली प्रमुख सब्जी फसल जो धूप और मध्यम ठंड में भरपूर उपज देती है।",
      growingTips: [
        "फलों को सड़ने से बचाने के लिए पौधों को बांस के सहारे बांधें (स्टेकिंग करें)।",
        "नमी बचाने और खरपतवार रोकने के लिए मल्चिंग का प्रयोग करें।",
        "फल के पिछले हिस्से को काला होने से बचाने के लिए कैल्शियम का छिड़काव करें।"
      ],
      fertilizerNeeds: "संतुलित एनपीके के साथ कैल्शियम नाइट्रेट और बोरॉन का उपयोग करें।"
    }
  }
};

/**
 * Returns strictly localized crop information with zero language mixing.
 */
export function getLocalizedCrop(cropIdOrName: string, lang: LanguageCode): LocalizedCropInfo {
  const normalizedKey = cropIdOrName.toLowerCase().replace(/[^a-z]/g, '');
  
  // Find match in translation dictionary
  for (const [key, val] of Object.entries(CROP_TRANSLATIONS)) {
    if (normalizedKey.includes(key) || key.includes(normalizedKey)) {
      const selectedLang: 'en' | 'te' | 'hi' = (lang === 'te' || lang === 'hi') ? lang : 'en';
      return val[selectedLang] || val.en;
    }
  }

  // Fallback if crop is not in dictionary: return clean English or sanitized
  return {
    name: cropIdOrName,
    category: lang === 'te' ? 'పంట' : (lang === 'hi' ? 'फसल' : 'Crop'),
    season: lang === 'te' ? 'సాధారణ కాలం' : (lang === 'hi' ? 'सामान्य मौसम' : 'General'),
    waterRequirement: lang === 'te' ? 'మితమైన' : (lang === 'hi' ? 'मध्यम' : 'Medium'),
    soilTypes: [lang === 'te' ? 'సారవంతమైన నేల' : (lang === 'hi' ? 'उपजाऊ मिट्टी' : 'Fertile Loam')],
    description: lang === 'te' ? 'ఆదర్శవంతమైన నేల పరిస్థితులకు అనువైన పంట.' : (lang === 'hi' ? 'अनुकूल मिट्टी की परिस्थितियों के लिए उपयुक्त फसल।' : 'Suitable crop for current soil conditions.'),
    growingTips: [lang === 'te' ? 'సమతుల్య ఎరువులను వాడండి మరియు సమయానికి నీటి తడులు ఇవ్వండి.' : (lang === 'hi' ? 'संतुलित खाद डालें और समय पर सिंचाई करें।' : 'Apply balanced fertilizers and timely irrigation.')],
    fertilizerNeeds: lang === 'te' ? 'మట్టి పరీక్ష ఆధారంగా ఎరువులు వేయండి.' : (lang === 'hi' ? 'मृदा परीक्षण के आधार पर खाद दें।' : 'Apply fertilizers based on soil test.')
  };
}

/**
 * Returns localized name for a crop with zero language mixing.
 */
export function getCropName(cropIdOrName: string, lang: LanguageCode): string {
  return getLocalizedCrop(cropIdOrName, lang).name;
}

/**
 * Returns localized category name with zero language mixing.
 */
export function getCategoryName(category: string, lang: LanguageCode): string {
  const cat = category.toLowerCase();
  if (lang === 'te') {
    if (cat.includes('cereal')) return 'ధాన్యాలు';
    if (cat.includes('pulse')) return 'పప్పుదినుసులు';
    if (cat.includes('fruit')) return 'పండ్లు';
    if (cat.includes('commercial') || cat.includes('cash')) return 'వాణిజ్య పంటలు';
    if (cat.includes('oil')) return 'నూనె గింజలు';
    if (cat.includes('veg')) return 'కూరగాయలు';
    if (cat.includes('spice')) return 'సుగంధ ద్రవ్యాలు';
    return 'పంటలు';
  }
  if (lang === 'hi') {
    if (cat.includes('cereal')) return 'अनाज';
    if (cat.includes('pulse')) return 'दलहन';
    if (cat.includes('fruit')) return 'फल';
    if (cat.includes('commercial') || cat.includes('cash')) return 'व्यावसायिक फसलें';
    if (cat.includes('oil')) return 'तिलहन';
    if (cat.includes('veg')) return 'सब्जियां';
    if (cat.includes('spice')) return 'मसाले';
    return 'फसलें';
  }
  return category;
}

/**
 * Returns localized season name with zero language mixing.
 */
export function getSeasonName(season: string, lang: LanguageCode): string {
  const s = season.toLowerCase();
  if (lang === 'te') {
    if (s.includes('kharif')) return 'ఖరీఫ్';
    if (s.includes('rabi')) return 'రబీ';
    if (s.includes('zaid') || s.includes('summer')) return 'వేసవి';
    if (s.includes('whole') || s.includes('year')) return 'ఏడాది పొడవునా';
    return season;
  }
  if (lang === 'hi') {
    if (s.includes('kharif')) return 'खरीफ';
    if (s.includes('rabi')) return 'रबी';
    if (s.includes('zaid') || s.includes('summer')) return 'जायद';
    if (s.includes('whole') || s.includes('year')) return 'पूरे वर्ष';
    return season;
  }
  return season;
}

/**
 * Returns localized water requirement label.
 */
export function getWaterReqName(water: string, lang: LanguageCode): string {
  const w = water.toLowerCase();
  if (lang === 'te') {
    if (w.includes('high')) return 'ఎక్కువ నీరు';
    if (w.includes('low')) return 'తక్కువ నీరు';
    return 'మితమైన నీరు';
  }
  if (lang === 'hi') {
    if (w.includes('high')) return 'अधिक जल';
    if (w.includes('low')) return 'कम जल';
    return 'मध्यम जल';
  }
  return water;
}

/**
 * Localized nutrient status label.
 */
export function getStatusName(status: string, lang: LanguageCode): string {
  const s = status.toLowerCase();
  if (lang === 'te') {
    if (s.includes('defic')) return 'లోపం';
    if (s.includes('excess')) return 'అధికం';
    return 'సరిపడా';
  }
  if (lang === 'hi') {
    if (s.includes('defic')) return 'कमी';
    if (s.includes('excess')) return 'अधिकता';
    return 'पर्याप्त';
  }
  return status;
}
