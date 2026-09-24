import { CROPS_DATA } from '../data/crops';
import { INDIA_LOCATIONS } from '../data/locations';
import { Crop, FertilizerItem, LanguageCode, RecommendationResult, RegionInputs, SoilHealthReport, SoilInputs } from '../types';
import { getCropName, getLocalizedCrop } from './cropLocalization';

/**
 * Calculates agronomic suitability distance.
 * If climate parameters are provided, includes them; if not, evaluates purely on soil chemistry (N, P, K, pH).
 */
function calculateCropSuitability(
  crop: Crop,
  n: number,
  p: number,
  k: number,
  ph: number,
  temp?: number,
  humidity?: number,
  rainfall?: number,
  soilType?: string,
  lang: LanguageCode = 'en'
): { score: number; matchPercentage: number; reason: string } {
  const normN = Math.abs(n - crop.optimalN) / 100;
  const normP = Math.abs(p - crop.optimalP) / 80;
  const normK = Math.abs(k - crop.optimalK) / 80;
  const normPh = Math.abs(ph - crop.optimalPh) / 2.5;

  let distance: number;

  const hasClimate = temp !== undefined && !isNaN(temp) &&
                     humidity !== undefined && !isNaN(humidity) &&
                     rainfall !== undefined && !isNaN(rainfall);

  if (hasClimate) {
    const normTemp = Math.abs(temp - crop.optimalTemp) / 15;
    const normHumidity = Math.abs(humidity - crop.optimalHumidity) / 40;
    const normRain = Math.abs(rainfall - crop.optimalRainfall) / 150;

    distance = Math.sqrt(
      normN * normN * 1.5 +
      normP * normP * 1.2 +
      normK * normK * 1.2 +
      normPh * normPh * 1.8 +
      normTemp * normTemp * 1.0 +
      normHumidity * normHumidity * 0.8 +
      normRain * normRain * 1.2
    );
  } else {
    // Pure soil chemistry calculation
    distance = Math.sqrt(
      normN * normN * 2.0 +
      normP * normP * 1.6 +
      normK * normK * 1.6 +
      normPh * normPh * 2.2
    );
  }

  // Soil type bonus/penalty if given
  if (soilType) {
    const isPreferred = crop.soilTypes.some(st =>
      st.toLowerCase().includes(soilType.toLowerCase()) ||
      soilType.toLowerCase().includes(st.toLowerCase())
    );
    if (isPreferred) {
      distance *= 0.85;
    } else {
      distance *= 1.15;
    }
  }

  const matchPercentage = Math.max(20, Math.min(99, Math.round(100 - (distance * 26))));
  const score = Math.max(0, +(10 - distance * 2.4).toFixed(1));

  let reason = '';
  if (lang === 'te') {
    reason = `మీ నేల పిహెచ్ (${ph}) మరియు నత్రజని, భాస్వరం, పొటాషియం స్థాయిలకు చాలా అనుకూలమైనది.`;
    if (crop.category === 'Pulses') {
      reason += ` ఇది పప్పుదినుసుల పంట కావడంతో నేలలో సహజ నత్రజనిని కూడా పెంచుతుంది.`;
    }
  } else if (lang === 'hi') {
    reason = `आपकी मृदा पीएच (${ph}) तथा नाइट्रोजन, फास्फोरस व पोटाश स्तर के लिए अति अनुकूल है।`;
    if (crop.category === 'Pulses') {
      reason += ` दलहनी फसल होने के कारण यह मिट्टी में प्राकृतिक नाइट्रोजन भी बढ़ाती है।`;
    }
  } else {
    reason = `Highly compatible with your soil pH (${ph}) and measured N-P-K chemical levels.`;
    if (crop.category === 'Pulses') {
      reason += ` As a pulse crop, it also enhances natural soil nitrogen fixation.`;
    }
  }

  return { score, matchPercentage, reason };
}

/**
 * Generates fertilizer recommendations strictly in the selected language.
 */
export function generateFertilizerGuidance(
  n: number,
  p: number,
  k: number,
  cropName?: string,
  lang: LanguageCode = 'en'
): FertilizerItem[] {
  const items: FertilizerItem[] = [];

  if (lang === 'te') {
    // Telugu
    if (n < 40) {
      items.push({
        nutrient: 'నత్రజని',
        status: 'లోపం',
        fertilizer: 'యూరియా లేదా వేపపూత పూసిన యూరియా',
        reason: `మట్టి పరీక్షలో నత్రజని ${n} మి.గ్రా/కి.గ్రా ఉంది (కనిష్ట పరిమితి 40 కన్నా తక్కువ).`,
        benefit: 'మొక్క ఏపుగా పెరగడానికి, ఆకులు పచ్చగా ఉండటానికి మరియు పిలకలు బాగా రావడానికి సహాయపడుతుంది.',
        action: 'విత్తే సమయంలో మరియు పైరు పెరిగే దశలో యూరియాను దఫాలుగా వేయండి.'
      });
    } else if (n <= 80) {
      items.push({
        nutrient: 'నత్రజని',
        status: 'సరిపడా',
        fertilizer: 'సేంద్రీయ ఎరువు లేదా వర్మీ కంపోస్ట్',
        reason: `నేలలో నత్రజని ${n} మి.గ్రా/కి.గ్రా తో సరిపడినంత స్థాయిలో ఉంది.`,
        benefit: 'పైరు పడిపోకుండా సమతుల్య ఎదుగుదలను కాపాడుతుంది.',
        action: 'అదనపు రసాయన నత్రజని అవసరం లేదు; పశువుల ఎరువు లేదా వానపాముల ఎరువు వేయండి.'
      });
    } else {
      items.push({
        nutrient: 'నత్రజని',
        status: 'అధికం',
        fertilizer: 'నత్రజని ఎరువులు వేయవద్దు',
        reason: `నేలలో నత్రజని ${n} మి.గ్రా/కి.గ్రా మించి అధికంగా ఉంది.`,
        benefit: 'పైరు విపరీతంగా పెరిగి పడిపోకుండా మరియు పురుగులు ఆశించకుండా కాపాడుతుంది.',
        action: 'యూరియా వాడకం పూర్తిగా నిలిపివేయండి; మొక్క కాండం దృఢత్వానికి పొటాష్ అందించండి.'
      });
    }

    if (p < 40) {
      items.push({
        nutrient: 'భాస్వరం',
        status: 'లోపం',
        fertilizer: 'డిఎపి (18-46-0) లేదా సింగిల్ సూపర్ ఫాస్ఫేట్',
        reason: `అందుబాటులో ఉన్న భాస్వరం ${p} మి.గ్రా/కి.గ్రా ఉంది (40 కన్నా తక్కువ).`,
        benefit: 'వేరు వ్యవస్థ బలంగా అభివృద్ధి చెందడానికి మరియు గింజ కట్టడానికి చాలా ముఖ్యం.',
        action: 'విత్తే సమయంలో దుక్కిలోనే డిఎపి లేదా సింగిల్ సూపర్ ఫాస్ఫేట్ వేయండి.'
      });
    } else if (p <= 80) {
      items.push({
        nutrient: 'భాస్వరం',
        status: 'సరిపడా',
        fertilizer: 'భాస్వరం ఎరువులు అవసరం లేదు',
        reason: `భాస్వరం ${p} మి.గ్రా/కి.గ్రా తో సరైన పరిమితిలో ఉంది.`,
        benefit: 'జింక్ మరియు ఇనుము వంటి ఇతర సూక్ష్మ పోషకాల లభ్యతను కాపాడుతుంది.',
        action: 'రసాయన భాస్వరం ఎరువులు వేయవలసిన పనిలేదు.'
      });
    } else {
      items.push({
        nutrient: 'భాస్వరం',
        status: 'అధికం',
        fertilizer: 'భాస్వరం ఎరువులు వాడవద్దు',
        reason: `భాస్వరం ${p} మి.గ్రా/కి.గ్రా మించి అధికంగా ఉంది.`,
        benefit: 'జింక్ లోపం రాకుండా నివారిస్తుంది.',
        action: 'డిఎపి లేదా కాంప్లెక్స్ ఎరువులు వేయకండి; అవసరమైతే జింక్ పిచికారీ చేయండి.'
      });
    }

    if (k < 40) {
      items.push({
        nutrient: 'పొటాషియం',
        status: 'లోపం',
        fertilizer: 'మ్యూరేట్ ఆఫ్ పొటాష్ (ఎంఒపి)',
        reason: `నేలలో పొటాషియం ${k} మి.గ్రా/కి.గ్రా ఉంది (40 కన్నా తక్కువ).`,
        benefit: 'మొక్కకు తెగుళ్లు, కరువును తట్టుకునే శక్తిని మరియు గింజ బరువును పెంచుతుంది.',
        action: 'దుక్కిలో లేదా పూత మరియు కాయ దశలో పొటాష్ అందించండి.'
      });
    } else if (k <= 80) {
      items.push({
        nutrient: 'పొటాషియం',
        status: 'సరిపడా',
        fertilizer: 'పొటాష్ సాధారణ నిర్వహణ',
        reason: `పొటాషియం ${k} మి.గ్రా/కి.గ్రా సరైన పరిధిలో ఉంది.`,
        benefit: 'గింజల నాణ్యత మరియు గట్టిదనాన్ని సమతుల్యంగా ఉంచుతుంది.',
        action: 'అదనపు పొటాష్ అవసరం లేదు.'
      });
    } else {
      items.push({
        nutrient: 'పొటాషియం',
        status: 'అధికం',
        fertilizer: 'పొటాష్ ఎరువులు నివారించండి',
        reason: `పొటాషియం ${k} మి.గ్రా/కి.గ్రా మించి అధికంగా ఉంది.`,
        benefit: 'మెగ్నీషియం మరియు కాల్షియం శోషణ సరిగ్గా జరగడానికి తోడ్పడుతుంది.',
        action: 'ఈ సీజన్‌లో పొటాష్ ఎరువులు వాడకండి.'
      });
    }

    return items;
  }

  if (lang === 'hi') {
    // Hindi
    if (n < 40) {
      items.push({
        nutrient: 'नाइट्रोजन',
        status: 'कमी',
        fertilizer: 'यूरिया या नीम लेपित यूरिया',
        reason: `मृदा परीक्षण में नाइट्रोजन ${n} मि.ग्रा./किग्रा है (40 से कम)।`,
        benefit: 'पौधों के समुचित वानस्पतिक विकास और हरियाली के लिए आवश्यक है।',
        action: 'बुवाई के समय तथा कल्ले फूटते समय यूरिया को दो-तीन किस्तों में दें।'
      });
    } else if (n <= 80) {
      items.push({
        nutrient: 'नाइट्रोजन',
        status: 'पर्याप्त',
        fertilizer: 'जैविक खाद या वर्मीकम्पोस्ट',
        reason: `मृदा नाइट्रोजन ${n} मि.ग्रा./किग्रा आदर्श स्तर पर है।`,
        benefit: 'फसल के संतुलित विकास को बनाए रखता है।',
        action: 'अतिरिक्त रासायनिक नाइट्रोजन की आवश्यकता नहीं; गोबर की खाद डालें।'
      });
    } else {
      items.push({
        nutrient: 'नाइट्रोजन',
        status: 'अधिकता',
        fertilizer: 'नाइट्रोजन उर्वरक न डालें',
        reason: `नाइट्रोजन ${n} मि.ग्रा./किग्रा अत्यधिक मात्रा में है।`,
        benefit: 'फसल गिरने और कीटों के प्रकोप से बचाव करता है।',
        action: 'यूरिया का प्रयोग बंद करें; तने की मजबूती के लिए पोटाश दें।'
      });
    }

    if (p < 40) {
      items.push({
        nutrient: 'फास्फोरस',
        status: 'कमी',
        fertilizer: 'डीएपी (18-46-0) या सिंगल सुपर फॉस्फेट (एसएसपी)',
        reason: `उपलब्ध फास्फोरस ${p} मि.ग्रा./किग्रा है (40 से कम)।`,
        benefit: 'जड़ों के गहरे विकास और दानों के भराव के लिए अति महत्वपूर्ण है।',
        action: 'बुवाई के समय खेत की तैयारी में डीएपी या एसएसपी डालें।'
      });
    } else if (p <= 80) {
      items.push({
        nutrient: 'फास्फोरस',
        status: 'पर्याप्त',
        fertilizer: 'फास्फोरस उर्वरक की आवश्यकता नहीं',
        reason: `फास्फोरस ${p} मि.ग्रा./किग्रा उपयुक्त स्तर पर है।`,
        benefit: 'सूक्ष्म पोषक तत्वों का संतुलन बनाए रखता है।',
        action: 'फास्फेट खाद देने की आवश्यकता नहीं है।'
      });
    } else {
      items.push({
        nutrient: 'फास्फोरस',
        status: 'अधिकता',
        fertilizer: 'फास्फेट खाद से बचें',
        reason: `फास्फोरस ${p} मि.ग्रा./किग्रा सीमा से अधिक है।`,
        benefit: 'जिंक और लोहे की कमी को रोकता है।',
        action: 'डीएपी या एसएसपी का प्रयोग न करें।'
      });
    }

    if (k < 40) {
      items.push({
        nutrient: 'पोटाश',
        status: 'कमी',
        fertilizer: 'म्यूरेट ऑफ पोटाश (एमओपी)',
        reason: `मृदा पोटाश ${k} मि.ग्रा./किग्रा है (40 से कम)।`,
        benefit: 'रोग प्रतिरोधक क्षमता, सूखा सहनशीलता और दानों की चमक बढ़ाता है।',
        action: 'बुवाई पर या फूल आने से पहले पोटाश का प्रयोग करें।'
      });
    } else if (k <= 80) {
      items.push({
        nutrient: 'पोटाश',
        status: 'पर्याप्त',
        fertilizer: 'पोटाश का सामान्य स्तर',
        reason: `पोटाश ${k} मि.ग्रा./किग्रा पर्याप्त मात्रा में है।`,
        benefit: 'गुणवत्ता और चमक को बनाए रखता है।',
        action: 'अतिरिक्त पोटाश की आवश्यकता नहीं है।'
      });
    } else {
      items.push({
        nutrient: 'पोटाश',
        status: 'अधिकता',
        fertilizer: 'पोटाश खाद न डालें',
        reason: `पोटाश ${k} मि.ग्रा./किग्रा अधिक मात्रा में है।`,
        benefit: 'मैग्नीशियम और कैल्शियम के अवशोषण को सुगम बनाता है।',
        action: 'इस मौसम में पोटाश न डालें।'
      });
    }

    return items;
  }

  // English
  if (n < 40) {
    items.push({
      nutrient: 'Nitrogen',
      status: 'Deficient',
      fertilizer: 'Urea (46% N) or Neem-Coated Urea',
      reason: `Soil test nitrogen is ${n} mg/kg (below threshold of 40 mg/kg).`,
      benefit: 'Stimulates robust vegetative leaf canopy, chlorophyll synthesis, and early tillering.',
      action: 'Apply split basal application of Neem-coated Urea at sowing, followed by top-dressing.'
    });
  } else if (n <= 80) {
    items.push({
      nutrient: 'Nitrogen',
      status: 'Optimal',
      fertilizer: 'Farmyard Manure or Vermicompost',
      reason: `Soil nitrogen level of ${n} mg/kg is within optimal range (40 - 80 mg/kg).`,
      benefit: 'Maintains balanced plant vigor without lodging risks.',
      action: 'Chemical nitrogen is not required. Apply farmyard manure or vermicompost.'
    });
  } else {
    items.push({
      nutrient: 'Nitrogen',
      status: 'Excess',
      fertilizer: 'Withhold Nitrogenous Fertilizers',
      reason: `Soil nitrogen level of ${n} mg/kg exceeds 80 mg/kg.`,
      benefit: 'Prevents stem weakness, excessive vegetative growth, and insect attraction.',
      action: 'Do not apply urea. Ensure drainage and apply moderate potash to strengthen stems.'
    });
  }

  if (p < 40) {
    items.push({
      nutrient: 'Phosphorus',
      status: 'Deficient',
      fertilizer: 'Di-Ammonium Phosphate (DAP) or Single Super Phosphate (SSP)',
      reason: `Soil available phosphorus is ${p} mg/kg (below 40 mg/kg).`,
      benefit: 'Crucial for root architecture development, rapid establishment, and seed setting.',
      action: 'Apply DAP or SSP in a single basal placement directly into root zone at sowing.'
    });
  } else if (p <= 80) {
    items.push({
      nutrient: 'Phosphorus',
      status: 'Optimal',
      fertilizer: 'No Supplemental Phosphate Needed',
      reason: `Soil phosphorus is ${p} mg/kg, comfortably within optimal range (40 - 80 mg/kg).`,
      benefit: 'Ensures sturdy root network without locking up micronutrients.',
      action: 'Avoid routine phosphate re-application.'
    });
  } else {
    items.push({
      nutrient: 'Phosphorus',
      status: 'Excess',
      fertilizer: 'Avoid Phosphate Fertilizers',
      reason: `Soil phosphorus is ${p} mg/kg (above 80 mg/kg).`,
      benefit: 'Avoids chemical antagonism that precipitates Zinc and Iron.',
      action: 'Strictly avoid DAP or SSP. Spray foliar Zinc Chelate if vein yellowing appears.'
    });
  }

  if (k < 40) {
    items.push({
      nutrient: 'Potassium',
      status: 'Deficient',
      fertilizer: 'Muriate of Potash (MOP)',
      reason: `Soil potassium is ${k} mg/kg (below 40 mg/kg).`,
      benefit: 'Builds straw strength, regulates water retention, and enhances disease tolerance.',
      action: 'Incorporate MOP as basal dose or in split doses during flowering and grain filling.'
    });
  } else if (k <= 80) {
    items.push({
      nutrient: 'Potassium',
      status: 'Optimal',
      fertilizer: 'Standard Potash Maintenance',
      reason: `Soil potassium level of ${k} mg/kg is in the ideal range (40 - 80 mg/kg).`,
      benefit: 'Promotes optimal grain filling, fruit size, and shelf life.',
      action: 'No heavy potash correction required.'
    });
  } else {
    items.push({
      nutrient: 'Potassium',
      status: 'Excess',
      fertilizer: 'Avoid Potash Fertilizers',
      reason: `Soil potassium is ${k} mg/kg (above 80 mg/kg).`,
      benefit: 'Prevents competition with Magnesium and Calcium absorption.',
      action: 'Omit MOP or potash fertilizers from this season.'
    });
  }

  return items;
}

/**
 * Calculates overall soil health and status in selected language.
 */
export function evaluateSoilHealth(
  n: number,
  p: number,
  k: number,
  ph: number,
  lang: LanguageCode = 'en'
): SoilHealthReport {
  let score = 100;
  const advice: string[] = [];
  const amendments: string[] = [];

  const nStatus = n < 40 ? 'Deficient' : n <= 80 ? 'Optimal' : 'Excess';
  const pStatus = p < 40 ? 'Deficient' : p <= 80 ? 'Optimal' : 'Excess';
  const kStatus = k < 40 ? 'Deficient' : k <= 80 ? 'Optimal' : 'Excess';

  let phStatus: 'Strongly Acidic' | 'Moderately Acidic' | 'Slightly Acidic' | 'Neutral' | 'Slightly Alkaline' | 'Moderately Alkaline' | 'Strongly Alkaline';
  if (ph < 5.0) phStatus = 'Strongly Acidic';
  else if (ph < 6.0) phStatus = 'Moderately Acidic';
  else if (ph < 6.5) phStatus = 'Slightly Acidic';
  else if (ph <= 7.3) phStatus = 'Neutral';
  else if (ph <= 8.0) phStatus = 'Slightly Alkaline';
  else if (ph <= 8.8) phStatus = 'Moderately Alkaline';
  else phStatus = 'Strongly Alkaline';

  if (nStatus !== 'Optimal') score -= 15;
  if (pStatus !== 'Optimal') score -= 15;
  if (kStatus !== 'Optimal') score -= 15;
  if (phStatus !== 'Neutral' && phStatus !== 'Slightly Acidic' && phStatus !== 'Slightly Alkaline') score -= 20;

  score = Math.max(25, Math.min(100, score));

  if (lang === 'te') {
    if (ph < 6.0) {
      advice.push('నేల ఆమ్ల గుణాన్ని తగ్గిండానికి వ్యవసాయ సున్నం వేయండి.');
      amendments.push('ఎకరాకు 200-400 కిలోల వ్యవసాయ సున్నం వేసి దున్నండి.');
    } else if (ph > 8.0) {
      advice.push('నేల క్షార గుణాన్ని తగ్గించడానికి జిప్సం మరియు సేంద్రీయ ఎరువులు వేయండి.');
      amendments.push('ఎకరాకు 400 కిలోల వ్యవసాయ జిప్సం మరియు పచ్చిరొట్ట ఎరువులు వాడండి.');
    } else {
      advice.push('నేల పిహెచ్ తటస్థంగా ఉంది, ఇది పంటల ఎదుగుదలకు అత్యంత అనుకూలమైనది.');
    }
  } else if (lang === 'hi') {
    if (ph < 6.0) {
      advice.push('अम्लीयता कम करने के लिए खेत में कृषि चूना डालें।');
      amendments.push('200-400 किग्रा/हेक्टेयर कृषि चूना मिलाकर जुताई करें।');
    } else if (ph > 8.0) {
      advice.push('क्षारीयता सुधार हेतु जिप्सम और जैविक खाद का प्रयोग करें।');
      amendments.push('400-500 किग्रा/हेक्टेयर कृषि जिप्सम और हरी खाद का उपयोग करें।');
    } else {
      advice.push('मृदा पीएच उदासीन और संतुलित है, जो अधिकांश फसलों के लिए उत्तम है।');
    }
  } else {
    if (ph < 6.0) {
      advice.push('Apply agricultural lime (calcium carbonate) to neutralize soil acidity.');
      amendments.push('Broadcast 300-500 kg/ha agricultural lime 3-4 weeks prior to planting.');
    } else if (ph > 8.0) {
      advice.push('Apply agricultural gypsum and organic matter to ameliorate alkaline conditions.');
      amendments.push('Apply 400-600 kg/ha gypsum and incorporate green manure.');
    } else {
      advice.push('Soil pH is in the optimal neutral range for maximum nutrient bioavailability.');
    }
  }

  let statusText = 'Good';
  if (score >= 80) statusText = lang === 'te' ? 'అద్భుతం' : (lang === 'hi' ? 'उत्कृष्ट' : 'Excellent');
  else if (score >= 60) statusText = lang === 'te' ? 'మంచిది' : (lang === 'hi' ? 'अच्छा' : 'Good');
  else if (score >= 40) statusText = lang === 'te' ? 'మధ్యస్థం' : (lang === 'hi' ? 'मध्यम' : 'Moderate');
  else statusText = lang === 'te' ? 'శ్రద్ధ అవసరం' : (lang === 'hi' ? 'ध्यान देने योग्य' : 'Needs Attention');

  return {
    score,
    overallScore: score,
    status: statusText,
    phStatus,
    nitrogenStatus: nStatus,
    phosphorusStatus: pStatus,
    potassiumStatus: kStatus,
    advice,
    amendments
  };
}

/**
 * Recommend crop based on user's entered soil test values.
 */
export function recommendBySoil(inputs: SoilInputs, lang: LanguageCode = 'en'): RecommendationResult {
  const { nitrogen, phosphorus, potassium, ph, temperature, humidity, rainfall } = inputs;

  const scored = CROPS_DATA.map(crop => {
    const result = calculateCropSuitability(crop, nitrogen, phosphorus, potassium, ph, temperature, humidity, rainfall, undefined, lang);
    return {
      crop,
      score: result.score,
      matchPercentage: result.matchPercentage,
      reason: result.reason
    };
  });

  scored.sort((a, b) => b.matchPercentage - a.matchPercentage);

  const best = scored[0];
  const runnerUps = scored.slice(1, 4);

  const localizedBest = getLocalizedCrop(best.crop.id, lang);
  const fertilizerOptions = generateFertilizerGuidance(nitrogen, phosphorus, potassium, localizedBest.name, lang);
  const soilHealth = evaluateSoilHealth(nitrogen, phosphorus, potassium, ph, lang);

  let farmerAdvice: string[] = [];
  if (lang === 'te') {
    farmerAdvice = [
      `${localizedBest.name} పంటకు సిఫార్సు చేయబడిన కాలం: ${localizedBest.season}.`,
      ...localizedBest.growingTips,
      'మొదటి 30 రోజులు కలుపు లేకుండా చూసుకుంటే పంట నేలలోని పోషకాలను పూర్తిగా వినియోగించుకుంటుంది.'
    ];
  } else if (lang === 'hi') {
    farmerAdvice = [
      `${localizedBest.name} के लिए अनुशंसित मौसम: ${localizedBest.season}।`,
      ...localizedBest.growingTips,
      'अंकुरण के प्रारंभिक 30 दिनों तक खेत को खरपतवार मुक्त रखें ताकि पौधे पोषक तत्वों का पूरा लाभ ले सकें।'
    ];
  } else {
    farmerAdvice = [
      `Recommended season for ${localizedBest.name}: ${localizedBest.season}.`,
      ...localizedBest.growingTips,
      'Maintain weed-free conditions during the critical first 30 days after germination.'
    ];
  }

  return {
    id: `REC-SOIL-${Date.now()}`,
    timestamp: new Date().toISOString(),
    mode: 'soil',
    crop: best.crop,
    suitabilityScore: best.score,
    matchPercentage: best.matchPercentage,
    runnerUpCrops: runnerUps,
    soilValues: {
      nitrogen,
      phosphorus,
      potassium,
      ph,
      isEstimated: false
    },
    weatherValues: {
      temperature: temperature || 26,
      humidity: humidity || 65,
      rainfall: rainfall || 150
    },
    fertilizerOptions,
    soilHealth,
    farmerAdvice
  };
}

/**
 * Recommend crop based on regional selection.
 */
export function recommendByRegion(inputs: RegionInputs, lang: LanguageCode = 'en'): RecommendationResult {
  const stateData = INDIA_LOCATIONS[inputs.state];
  const districtData = stateData?.districts.find(d => d.name === inputs.district);

  const benchmarkN = districtData?.benchmarkN || 65;
  const benchmarkP = districtData?.benchmarkP || 38;
  const benchmarkK = districtData?.benchmarkK || 45;
  const benchmarkPh = districtData?.benchmarkPh || 6.8;

  const scored = CROPS_DATA.map(crop => {
    let scoreMultiplier = 1.0;
    if (crop.majorStates.includes(inputs.state)) {
      scoreMultiplier *= 1.25;
    }

    const suitability = calculateCropSuitability(
      crop,
      benchmarkN,
      benchmarkP,
      benchmarkK,
      benchmarkPh,
      undefined,
      undefined,
      undefined,
      inputs.soilType,
      lang
    );

    const finalMatch = Math.min(99, Math.round(suitability.matchPercentage * scoreMultiplier));
    const finalScore = Math.min(10, +(suitability.score * scoreMultiplier).toFixed(1));

    return {
      crop,
      score: finalScore,
      matchPercentage: finalMatch,
      reason: suitability.reason
    };
  });

  scored.sort((a, b) => b.matchPercentage - a.matchPercentage);

  const best = scored[0];
  const runnerUps = scored.slice(1, 4);

  const localizedBest = getLocalizedCrop(best.crop.id, lang);
  const fertilizerOptions = generateFertilizerGuidance(benchmarkN, benchmarkP, benchmarkK, localizedBest.name, lang);
  const soilHealth = evaluateSoilHealth(benchmarkN, benchmarkP, benchmarkK, benchmarkPh, lang);

  let farmerAdvice: string[] = [];
  if (lang === 'te') {
    farmerAdvice = [
      `${inputs.state} ప్రాంతానికి ${localizedBest.name} పంట అనుకూలమైనది.`,
      ...localizedBest.growingTips
    ];
  } else if (lang === 'hi') {
    farmerAdvice = [
      `${inputs.state} क्षेत्र के लिए ${localizedBest.name} उत्तम फसल है।`,
      ...localizedBest.growingTips
    ];
  } else {
    farmerAdvice = [
      `${localizedBest.name} is well suited for the agro-climatic conditions of ${inputs.state}.`,
      ...localizedBest.growingTips
    ];
  }

  return {
    id: `REC-REG-${Date.now()}`,
    timestamp: new Date().toISOString(),
    mode: 'region',
    crop: best.crop,
    suitabilityScore: best.score,
    matchPercentage: best.matchPercentage,
    runnerUpCrops: runnerUps,
    soilValues: {
      nitrogen: benchmarkN,
      phosphorus: benchmarkP,
      potassium: benchmarkK,
      ph: benchmarkPh,
      isEstimated: true
    },
    weatherValues: {
      temperature: 28,
      humidity: 65,
      rainfall: 150
    },
    fertilizerOptions,
    soilHealth,
    farmerAdvice,
    regionDetails: {
      state: inputs.state,
      district: inputs.district,
      soilType: inputs.soilType,
      waterAvailability: inputs.waterAvailability,
      previousCrop: inputs.previousCrop,
      isEstimated: true
    }
  };
}
