import React, { useState, useEffect } from 'react';
import { MapPin, CheckCircle, AlertTriangle, Printer, Volume2, Square, ArrowRight, Droplets, Compass } from 'lucide-react';
import { INDIA_LOCATIONS } from '../data/locations';
import { LanguageCode, RecommendationResult, RegionInputs } from '../types';
import { getTranslation } from '../data/translations';
import { recommendByRegion } from '../utils/recommender';
import { speakText, stopSpeaking } from '../utils/speech';
import { detectCurrentLocation, DetectedLocation } from '../utils/geolocation';
import { getCropName, getLocalizedCrop } from '../utils/cropLocalization';

interface RegionRecommendationProps {
  language: LanguageCode;
  onRecommendationGenerated: (rec: RecommendationResult) => void;
  onOpenReport: (rec: RecommendationResult) => void;
}

export const RegionRecommendation: React.FC<RegionRecommendationProps> = ({
  language,
  onRecommendationGenerated,
  onOpenReport
}) => {
  const t = getTranslation(language);
  const stateNames = Object.keys(INDIA_LOCATIONS).sort();

  // STRICT RULE: No default state or district
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [soilType, setSoilType] = useState<string>('');
  const [waterAvailability, setWaterAvailability] = useState<'High' | 'Medium' | 'Low' | ''>('');
  const [previousCrop, setPreviousCrop] = useState<string>('');

  const [isLocating, setIsLocating] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState<DetectedLocation | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Available districts for the selected state
  const availableDistricts = selectedState ? INDIA_LOCATIONS[selectedState]?.districts || [] : [];

  // Update district when state changes manually
  const handleStateChange = (stateVal: string) => {
    setSelectedState(stateVal);
    setSelectedDistrict('');
    setSoilType('');
    setWaterAvailability('');
    if (formErrors.state) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy.state;
        return copy;
      });
    }
  };

  const handleDistrictChange = (distVal: string) => {
    setSelectedDistrict(distVal);
    const distData = availableDistricts.find(d => d.name === distVal);
    if (distData) {
      if (distData.defaultSoil && !soilType) {
        setSoilType(distData.defaultSoil);
      }
      if (distData.defaultWater && !waterAvailability) {
        setWaterAvailability(distData.defaultWater);
      }
    }
    if (formErrors.district) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy.district;
        return copy;
      });
    }
  };

  // Browser Geolocation Detection using actual device GPS and reverse geocoding
  const handleUseMyLocation = async () => {
    setIsLocating(true);
    setLocationError(null);

    const res = await detectCurrentLocation();
    setIsLocating(false);

    if (res.success && res.location) {
      setDetectedLocation(res.location);

      if (res.location.matchedStateKey) {
        setSelectedState(res.location.matchedStateKey);
        if (res.location.matchedDistrictName) {
          setSelectedDistrict(res.location.matchedDistrictName);
          const stateDistricts = INDIA_LOCATIONS[res.location.matchedStateKey]?.districts || [];
          const matchedD = stateDistricts.find(d => d.name === res.location?.matchedDistrictName);
          if (matchedD) {
            setSoilType(matchedD.defaultSoil);
            setWaterAvailability(matchedD.defaultWater);
          }
        }
      }
    } else {
      if (res.error?.code === 'PERMISSION_DENIED') {
        setLocationError(t.locationDeniedMessage);
      } else {
        setLocationError(t.locationFetchError);
      }
    }
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!selectedState) errors.state = t.valSelectState;
    if (!selectedDistrict) errors.district = t.valSelectDistrict;
    if (!soilType) errors.soil = t.valSelectSoil;
    if (!waterAvailability) {
      errors.water = language === 'te' ? 'దయచేసి నీటి లభ్యతను ఎంచుకోండి.' : (language === 'hi' ? 'कृपया जल उपलब्धता चुनें।' : 'Please select water availability.');
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const regionInputs: RegionInputs = {
      state: selectedState,
      district: selectedDistrict,
      soilType: soilType || 'Alluvial Soil',
      waterAvailability: (waterAvailability as 'High' | 'Medium' | 'Low') || 'Medium',
      previousCrop: previousCrop || undefined
    };

    const rec = recommendByRegion(regionInputs, language);
    setResult(rec);
    onRecommendationGenerated(rec);
  };

  // Audio Readout strictly in the selected language
  const handleToggleAudio = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else if (result) {
      setIsSpeaking(true);
      const locCrop = getLocalizedCrop(result.crop.id, language);
      let text = '';
      if (language === 'te') {
        text = `${selectedDistrict}, ${selectedState} ప్రాంతానికి సిఫార్సు చేయబడిన పంట: ${locCrop.name}. అనుకూలత: ${result.matchPercentage} శాతం. ${result.farmerAdvice[0] || ''}`;
      } else if (language === 'hi') {
        text = `${selectedDistrict}, ${selectedState} क्षेत्र के लिए अनुशंसित फसल: ${locCrop.name}. उपयुक्तता: ${result.matchPercentage} प्रतिशत. ${result.farmerAdvice[0] || ''}`;
      } else {
        text = `Regional recommendation for ${selectedDistrict}, ${selectedState}. Recommended crop is ${locCrop.name}. Match is ${result.matchPercentage} percent. ${result.farmerAdvice[0] || ''}`;
      }
      speakText(text, language, () => {
        setIsSpeaking(false);
      });
    }
  };

  const soilOptions = language === 'te' ? [
    { label: 'ఒండ్రు నేల', val: 'Alluvial Soil' },
    { label: 'నల్లరేగడి నేల', val: 'Black Soil' },
    { label: 'ఎర్ర నేల', val: 'Red Loam' },
    { label: 'బంక నేల', val: 'Clay Loam' },
    { label: 'ఇసుక నేల', val: 'Sandy Loam' },
    { label: 'లేటరైట్ నేల', val: 'Laterite' }
  ] : language === 'hi' ? [
    { label: 'जलोढ़ मिट्टी', val: 'Alluvial Soil' },
    { label: 'काली मिट्टी', val: 'Black Soil' },
    { label: 'लाल मिट्टी', val: 'Red Loam' },
    { label: 'दोमट मिट्टी', val: 'Clay Loam' },
    { label: 'बलुई मिट्टी', val: 'Sandy Loam' },
    { label: 'लैटेराइट मिट्टी', val: 'Laterite' }
  ] : [
    { label: 'Alluvial Soil', val: 'Alluvial Soil' },
    { label: 'Black Soil', val: 'Black Soil' },
    { label: 'Red Loam', val: 'Red Loam' },
    { label: 'Clay Loam', val: 'Clay Loam' },
    { label: 'Sandy Loam', val: 'Sandy Loam' },
    { label: 'Laterite', val: 'Laterite' }
  ];

  const waterOptions = language === 'te' ? [
    { label: 'ఎక్కువ నీరు (కాలువలు లేదా నిరంతర బోర్లు)', val: 'High' },
    { label: 'మితమైన నీరు (బావులు లేదా పరిమిత వర్షం)', val: 'Medium' },
    { label: 'తక్కువ నీరు (వర్షాధార మెట్ట భూములు)', val: 'Low' }
  ] : language === 'hi' ? [
    { label: 'अधिक जल (नहर अथवा नलकूप)', val: 'High' },
    { label: 'मध्यम जल (सीमित सिंचाई या कुआं)', val: 'Medium' },
    { label: 'कम जल (वर्षा आधारित शुष्क भूमि)', val: 'Low' }
  ] : [
    { label: 'High (Canals or continuous tube well)', val: 'High' },
    { label: 'Medium (Borewell or seasonal irrigation)', val: 'Medium' },
    { label: 'Low (Rainfed dryland)', val: 'Low' }
  ];

  const localizedMainCrop = result ? getLocalizedCrop(result.crop.id, language) : null;

  return (
    <div className="space-y-8">
      {/* Configuration Header Card */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 font-serif">
                {language === 'te' ? 'ప్రాంతీయ వ్యవసాయ వాతావరణ సిఫార్సు' : (language === 'hi' ? 'क्षेत्रीय कृषि जलवायु अनुशंसा' : 'Regional Agro-Climatic Recommendation')}
              </h2>
              <p className="text-xs text-neutral-600 mt-0.5">
                {language === 'te' ? 'మీ ప్రాంతాన్ని గుర్తించి అనుకూలమైన పంటను పొందండి.' : (language === 'hi' ? 'अपने वास्तविक क्षेत्र की पहचान कर उपयुक्त फसल सुझाव पाएं।' : 'Identify your real farm region to discover scientifically matched crops.')}
              </p>
            </div>
          </div>

          {/* Automatic Geolocation Trigger Button */}
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={isLocating}
            className="px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all shrink-0"
          >
            <MapPin className={`w-4 h-4 ${isLocating ? 'animate-bounce' : ''}`} />
            <span>{isLocating ? t.locating : t.useMyLocation}</span>
          </button>
        </div>

        {/* Location Detected Banner (Real GPS Location Only) */}
        {detectedLocation && (
          <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-300 rounded-lg flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-950">
              <span className="font-bold mr-1.5">{t.locationDetectedPrefix}</span>
              <span className="font-semibold">{detectedLocation.displayName}</span>
              <span className="ml-2 text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-bold">
                {t.liveGpsTag}
              </span>
            </div>
          </div>
        )}

        {/* Location Error / Denied Notice */}
        {locationError && (
          <div className="mt-4 p-3.5 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-lg flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>{locationError}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* State Selection - Starts EMPTY */}
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                {t.state} <span className="text-red-600">*</span>
              </label>
              <select
                value={selectedState}
                onChange={e => handleStateChange(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-semibold focus:outline-none focus:ring-2 ${
                  formErrors.state ? 'border-red-500 ring-1 ring-red-300' : 'border-neutral-300 focus:ring-emerald-500'
                }`}
              >
                <option value="" disabled>{t.selectStatePlaceholder}</option>
                {stateNames.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {formErrors.state && <p className="text-[11px] text-red-600 mt-1">{formErrors.state}</p>}
            </div>

            {/* District Selection - Starts EMPTY */}
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                {t.district} <span className="text-red-600">*</span>
              </label>
              <select
                value={selectedDistrict}
                onChange={e => handleDistrictChange(e.target.value)}
                disabled={!selectedState}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-semibold focus:outline-none focus:ring-2 disabled:bg-neutral-100 disabled:cursor-not-allowed ${
                  formErrors.district ? 'border-red-500 ring-1 ring-red-300' : 'border-neutral-300 focus:ring-emerald-500'
                }`}
              >
                <option value="" disabled>{t.selectDistrictPlaceholder}</option>
                {availableDistricts.map(dist => (
                  <option key={dist.name} value={dist.name}>{dist.name}</option>
                ))}
              </select>
              {formErrors.district && <p className="text-[11px] text-red-600 mt-1">{formErrors.district}</p>}
            </div>

            {/* Soil Type Selection - Starts EMPTY */}
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                {t.soilType} <span className="text-red-600">*</span>
              </label>
              <select
                value={soilType}
                onChange={e => {
                  setSoilType(e.target.value);
                  if (formErrors.soil) {
                    setFormErrors(prev => {
                      const copy = { ...prev };
                      delete copy.soil;
                      return copy;
                    });
                  }
                }}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-semibold focus:outline-none focus:ring-2 ${
                  formErrors.soil ? 'border-red-500 ring-1 ring-red-300' : 'border-neutral-300 focus:ring-emerald-500'
                }`}
              >
                <option value="" disabled>{t.selectSoilPlaceholder}</option>
                {soilOptions.map(opt => (
                  <option key={opt.val} value={opt.val}>{opt.label}</option>
                ))}
              </select>
              {formErrors.soil && <p className="text-[11px] text-red-600 mt-1">{formErrors.soil}</p>}
            </div>

            {/* Water Availability - Starts EMPTY */}
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                {t.waterAvailability} <span className="text-red-600">*</span>
              </label>
              <select
                value={waterAvailability}
                onChange={e => {
                  setWaterAvailability(e.target.value as any);
                  if (formErrors.water) {
                    setFormErrors(prev => {
                      const copy = { ...prev };
                      delete copy.water;
                      return copy;
                    });
                  }
                }}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-semibold focus:outline-none focus:ring-2 ${
                  formErrors.water ? 'border-red-500 ring-1 ring-red-300' : 'border-neutral-300 focus:ring-emerald-500'
                }`}
              >
                <option value="" disabled>{t.selectWaterPlaceholder}</option>
                {waterOptions.map(opt => (
                  <option key={opt.val} value={opt.val}>{opt.label}</option>
                ))}
              </select>
              {formErrors.water && <p className="text-[11px] text-red-600 mt-1">{formErrors.water}</p>}
            </div>
          </div>

          <div className="pt-2 flex justify-start">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>{t.getRecommendation}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Recommendation Results (Strict Single Language) */}
      {result && localizedMainCrop && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-emerald-300 p-6 shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 mb-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.recommendedCrop}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 font-serif">
                  {localizedMainCrop.name}
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  {language === 'te' ? 'ప్రాంతం' : (language === 'hi' ? 'स्थान' : 'Location')}: {selectedDistrict}, {selectedState} • {language === 'te' ? 'కాలం' : (language === 'hi' ? 'मौसम' : 'Season')}: {localizedMainCrop.season}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-semibold text-neutral-600">
                    {t.suitabilityScore}
                  </span>
                  <div className="text-3xl font-black text-emerald-700 tabular-nums">
                    {result.matchPercentage}%
                  </div>
                </div>

                <button
                  onClick={handleToggleAudio}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${
                    isSpeaking ? 'bg-red-600 text-white animate-pulse' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                  title="Listen"
                >
                  {isSpeaking ? (
                    <>
                      <Square className="w-3.5 h-3.5" />
                      <span>{t.stopAudio}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{t.listenAudio}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onOpenReport(result)}
                  className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold"
                  title="Print Report"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-xs text-emerald-900 leading-relaxed">
                {localizedMainCrop.description}
              </p>
            </div>
          </div>

          {/* What Soil Has vs What Crop Needs */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>
                    {language === 'te'
                      ? 'నేల పోషకాల విశ్లేషణ: నేలలో ఉన్నవి vs పంటకు కావలసినవి'
                      : language === 'hi'
                      ? 'मृदा पोषक तत्व विश्लेषण: मिट्टी में क्या है और फसल को क्या चाहिए'
                      : 'Soil Nutrient Balance: What Soil Has vs What Crop Needs'}
                  </span>
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {language === 'te'
                    ? 'ఎంచుకున్న ప్రాంత నేల ప్రకారం పోషకాల స్థితి మరియు పంట అవసరాల పోలిక.'
                    : language === 'hi'
                    ? 'चयनित क्षेत्र की मिट्टी अनुसार पोषक तत्व स्थिति और फसल की आवश्यकता की तुलना।'
                    : 'Nutrient status of selected region and specific requirements of the crop.'}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-neutral-200 rounded-lg overflow-hidden">
                <thead className="bg-neutral-100 text-neutral-700">
                  <tr>
                    <th className="p-3 font-bold border-b border-neutral-200">
                      {language === 'te' ? 'పోషకం' : language === 'hi' ? 'पोषक तत्व' : 'Nutrient'}
                    </th>
                    <th className="p-3 font-bold border-b border-neutral-200">
                      {language === 'te' ? 'నేలలో ఉన్నది (ప్రాంతీయ ప్రామాణికం)' : language === 'hi' ? 'मिट्टी में उपलब्ध (क्षेत्रीय मानक)' : 'Soil Has (Regional Benchmark)'}
                    </th>
                    <th className="p-3 font-bold border-b border-neutral-200">
                      {language === 'te' ? 'పంటకు అవసరం (సరైన పరిధి)' : language === 'hi' ? 'फसल की आवश्यकता (उचित स्तर)' : 'Crop Requires (Optimal)'}
                    </th>
                    <th className="p-3 font-bold border-b border-neutral-200">
                      {language === 'te' ? 'స్థితి' : language === 'hi' ? 'स्थिति' : 'Status'}
                    </th>
                    <th className="p-3 font-bold border-b border-neutral-200">
                      {language === 'te' ? 'సిఫార్సు చేసిన చర్యలు' : language === 'hi' ? 'अनुशंसित उपाय एवं सावधानी' : 'Recommended Actions & Guidance'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {/* Nitrogen */}
                  <tr className="hover:bg-neutral-50/50">
                    <td className="p-3 font-bold text-neutral-900">
                      {language === 'te' ? 'నత్రజని (Nitrogen)' : language === 'hi' ? 'नाइट्रोजन (N)' : 'Nitrogen (N)'}
                    </td>
                    <td className="p-3 font-bold text-neutral-800 tabular-nums">
                      {result.soilValues.nitrogen} mg/kg
                    </td>
                    <td className="p-3 text-neutral-700 tabular-nums">
                      {result.crop.optimalN} mg/kg ({result.crop.minN} - {result.crop.maxN})
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        result.soilValues.nitrogen < result.crop.minN
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : result.soilValues.nitrogen > result.crop.maxN
                          ? 'bg-blue-100 text-blue-900 border border-blue-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {result.soilValues.nitrogen < result.crop.minN
                          ? (language === 'te' ? 'లోపం: నేలలో తక్కువ ఉంది' : language === 'hi' ? 'कमी: मिट्टी में कम है' : 'Deficient: Soil lacks N')
                          : result.soilValues.nitrogen > result.crop.maxN
                          ? (language === 'te' ? 'అధికం: నేలలో ఎక్కువ ఉంది' : language === 'hi' ? 'अधिकता: मिट्टी में अधिक है' : 'Excess: High in soil')
                          : (language === 'te' ? 'సమతుల్యం: తగినంత ఉంది' : language === 'hi' ? 'संतुलित: पर्याप्त मात्रा में है' : 'Optimal: Sufficient in soil')}
                      </span>
                    </td>
                    <td className="p-3 text-neutral-800">
                      {result.soilValues.nitrogen < result.crop.minN
                        ? (language === 'te' ? 'యూరియా లేదా వేపపూత యూరియా వేయండి' : language === 'hi' ? 'नीम लेपित यूरिया का प्रयोग करें' : 'Apply split dose of Neem-coated Urea')
                        : result.soilValues.nitrogen > result.crop.maxN
                        ? (language === 'te' ? 'యూరియా వేయవద్దు' : language === 'hi' ? 'यूरिया का प्रयोग न करें' : 'Do not apply urea')
                        : (language === 'te' ? 'సేంద్రియ ఎరువు లేదా వర్మీకంపోస్ట్ సరిపోతుంది' : language === 'hi' ? 'गोबर की खाद या वर्मीकम्पोस्ट पर्याप्त है' : 'Maintain with organic manure or compost')}
                    </td>
                  </tr>

                  {/* Phosphorus */}
                  <tr className="hover:bg-neutral-50/50">
                    <td className="p-3 font-bold text-neutral-900">
                      {language === 'te' ? 'భాస్వరం (Phosphorus)' : language === 'hi' ? 'फास्फोरस (P)' : 'Phosphorus (P)'}
                    </td>
                    <td className="p-3 font-bold text-neutral-800 tabular-nums">
                      {result.soilValues.phosphorus} mg/kg
                    </td>
                    <td className="p-3 text-neutral-700 tabular-nums">
                      {result.crop.optimalP} mg/kg ({result.crop.minP} - {result.crop.maxP})
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        result.soilValues.phosphorus < result.crop.minP
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : result.soilValues.phosphorus > result.crop.maxP
                          ? 'bg-blue-100 text-blue-900 border border-blue-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {result.soilValues.phosphorus < result.crop.minP
                          ? (language === 'te' ? 'లోపం: వేరు అభివృద్ధికి కావాలి' : language === 'hi' ? 'कमी: जड़ विकास हेतु आवश्यकता' : 'Deficient: Soil lacks P')
                          : result.soilValues.phosphorus > result.crop.maxP
                          ? (language === 'te' ? 'అధికం: నేలలో ఎక్కువ ఉంది' : language === 'hi' ? 'अधिकता: मिट्टी में आवश्यकता से अधिक' : 'Excess: High in soil')
                          : (language === 'te' ? 'సమతుల్యం: తగినంత ఉంది' : language === 'hi' ? 'संतुलित: उचित स्तर उपलब्ध है' : 'Optimal: Sufficient in soil')}
                      </span>
                    </td>
                    <td className="p-3 text-neutral-800">
                      {result.soilValues.phosphorus < result.crop.minP
                        ? (language === 'te' ? 'విత్తే సమయంలో DAP లేదా SSP వేయండి' : language === 'hi' ? 'बुवाई के समय डीएपी या एसएसपी डालें' : 'Apply DAP or SSP in root zone at sowing')
                        : result.soilValues.phosphorus > result.crop.maxP
                        ? (language === 'te' ? 'ఫాస్ఫేట్ ఎరువులు వేయవద్దు' : language === 'hi' ? 'फास्फेट उर्वरक बिल्कुल न डालें' : 'Avoid phosphate fertilizers')
                        : (language === 'te' ? 'రసాయన ఫాస్ఫేట్ అవసరం లేదు' : language === 'hi' ? 'अतिरिक्त फास्फोरस की आवश्यकता नहीं है' : 'No supplemental phosphate needed')}
                    </td>
                  </tr>

                  {/* Potassium */}
                  <tr className="hover:bg-neutral-50/50">
                    <td className="p-3 font-bold text-neutral-900">
                      {language === 'te' ? 'పొటాషియం (Potassium)' : language === 'hi' ? 'पोटाश (K)' : 'Potassium (K)'}
                    </td>
                    <td className="p-3 font-bold text-neutral-800 tabular-nums">
                      {result.soilValues.potassium} mg/kg
                    </td>
                    <td className="p-3 text-neutral-700 tabular-nums">
                      {result.crop.optimalK} mg/kg ({result.crop.minK} - {result.crop.maxK})
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        result.soilValues.potassium < result.crop.minK
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : result.soilValues.potassium > result.crop.maxK
                          ? 'bg-blue-100 text-blue-900 border border-blue-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {result.soilValues.potassium < result.crop.minK
                          ? (language === 'te' ? 'లోపం: రోగనిరోధక శక్తికి కావాలి' : language === 'hi' ? 'कमी: दाना भराव व चमक हेतु आवश्यकता' : 'Deficient: Soil lacks K')
                          : result.soilValues.potassium > result.crop.maxK
                          ? (language === 'te' ? 'అధికం: నేలలో ఎక్కువ ఉంది' : language === 'hi' ? 'अधिकता: मिट्टी में अधिक है' : 'Excess: High in soil')
                          : (language === 'te' ? 'సమతుల్యం: తగినంత ఉంది' : language === 'hi' ? 'संतुलित: संतुलित स्तर उपलब्ध है' : 'Optimal: Sufficient in soil')}
                      </span>
                    </td>
                    <td className="p-3 text-neutral-800">
                      {result.soilValues.potassium < result.crop.minK
                        ? (language === 'te' ? 'మ్యూరియేట్ ఆఫ్ పొటాష్ (MOP) వేయండి' : language === 'hi' ? 'म्यूरिएट ऑफ पोटाश (MOP) डालें' : 'Apply Muriate of Potash (MOP)')
                        : result.soilValues.potassium > result.crop.maxK
                        ? (language === 'te' ? 'పొటాష్ ఎరువులు వేయవద్దు' : language === 'hi' ? 'पोटाश उर्वरक न डालें' : 'Omit potash fertilizers this season')
                        : (language === 'te' ? 'పొటాష్ సాధారణ నిర్వహణ సరిపోతుంది' : language === 'hi' ? 'साधारण प्रबंधन पर्याप्त है' : 'Standard potash maintenance')}
                    </td>
                  </tr>

                  {/* pH */}
                  <tr className="hover:bg-neutral-50/50">
                    <td className="p-3 font-bold text-neutral-900">
                      {language === 'te' ? 'నేల పిహెచ్ (pH)' : language === 'hi' ? 'पीएच मान (pH)' : 'Soil pH'}
                    </td>
                    <td className="p-3 font-bold text-neutral-800 tabular-nums">
                      {result.soilValues.ph}
                    </td>
                    <td className="p-3 text-neutral-700 tabular-nums">
                      {result.crop.optimalPh} ({result.crop.minPh} - {result.crop.maxPh})
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        result.soilValues.ph < result.crop.minPh
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : result.soilValues.ph > result.crop.maxPh
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {result.soilValues.ph < result.crop.minPh
                          ? (language === 'te' ? 'ఆమ్ల స్వభావం' : language === 'hi' ? 'अम्लीय' : 'Acidic')
                          : result.soilValues.ph > result.crop.maxPh
                          ? (language === 'te' ? 'క్షార స్వభావం' : language === 'hi' ? 'क्षारीय' : 'Alkaline')
                          : (language === 'te' ? 'సమతుల్యం: పంటకు పూర్తి అనుకూలం' : language === 'hi' ? 'संतुलित: फसल हेतु आदर्श' : 'Optimal: Perfect match')}
                      </span>
                    </td>
                    <td className="p-3 text-neutral-800">
                      {result.soilValues.ph < result.crop.minPh
                        ? (language === 'te' ? 'వ్యవసాయ సున్నం లేదా డోలమైట్ కలపండి' : language === 'hi' ? 'खेत में कृषि चूना या डोलोमाइट मिलाएं' : 'Apply agricultural lime')
                        : result.soilValues.ph > result.crop.maxPh
                        ? (language === 'te' ? 'జిప్సం లేదా పచ్చిరొట్ట ఎరువులు వేయండి' : language === 'hi' ? 'जिप्सम या हरी खाद का प्रयोग करें' : 'Apply gypsum or green manure')
                        : (language === 'te' ? 'పిహెచ్ మార్పు అవసరం లేదు' : language === 'hi' ? 'पीएच संशोधन की आवश्यकता नहीं' : 'No pH amendment needed')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Fertilizer Guidance (Strict Single Language) */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h4 className="text-base font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>{t.fertilizerAdvisory}</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.fertilizerOptions.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-neutral-900">{item.nutrient}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.status === 'Deficient' || item.status === 'లోపం' || item.status === 'कमी'
                          ? 'bg-amber-100 text-amber-800'
                          : item.status === 'Excess' || item.status === 'అధికం' || item.status === 'अधिकता'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-emerald-800 mb-2">{item.fertilizer}</div>
                    <p className="text-[11px] text-neutral-600 leading-relaxed mb-2">{item.reason}</p>
                    <p className="text-[11px] text-neutral-700 leading-relaxed mb-3">{item.benefit}</p>
                  </div>
                  <div className="pt-2 border-t border-neutral-200/80 text-[11px] font-medium text-emerald-950">
                    {item.action}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Farmer Advisory Tips */}
          {result.farmerAdvice.length > 0 && (
            <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
              <h4 className="text-base font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>{t.farmingAdvice}</span>
              </h4>
              <ul className="space-y-2.5">
                {result.farmerAdvice.map((advice, idx) => (
                  <li key={idx} className="text-xs text-neutral-700 flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Alternative Crops */}
          {result.runnerUpCrops.length > 0 && (
            <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
              <h4 className="text-base font-bold text-neutral-900 mb-4">
                {t.alternativeCrops}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {result.runnerUpCrops.map((alt, idx) => {
                  const altLoc = getLocalizedCrop(alt.crop.id, language);
                  return (
                    <div key={idx} className="p-4 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-neutral-500">{altLoc.category}</span>
                        <span className="text-xs font-bold text-emerald-700">{alt.matchPercentage}%</span>
                      </div>
                      <h5 className="text-base font-bold text-neutral-900 mt-1">{altLoc.name}</h5>
                      <p className="text-[11px] text-neutral-600 mt-1">{altLoc.season} • {altLoc.waterRequirement}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
