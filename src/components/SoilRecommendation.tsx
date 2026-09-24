import React, { useState } from 'react';
import { FlaskConical, Volume2, Square, CheckCircle, AlertCircle, Printer, RefreshCw, Layers, Droplets, Thermometer, Wind } from 'lucide-react';
import { Crop, LanguageCode, RecommendationResult, SoilInputs } from '../types';
import { getTranslation } from '../data/translations';
import { recommendBySoil } from '../utils/recommender';
import { speakText, stopSpeaking } from '../utils/speech';
import { getCropName, getCategoryName, getSeasonName, getWaterReqName, getLocalizedCrop, getStatusName } from '../utils/cropLocalization';
import { AudioSpeakerButton } from './AudioSpeakerButton';

interface SoilRecommendationProps {
  language: LanguageCode;
  onRecommendationGenerated: (rec: RecommendationResult) => void;
  onOpenReport: (rec: RecommendationResult) => void;
}

interface ManualSoilForm {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  ph: string;
  temperature: string;
  humidity: string;
  rainfall: string;
}

export const SoilRecommendation: React.FC<SoilRecommendationProps> = ({
  language,
  onRecommendationGenerated,
  onOpenReport
}) => {
  const t = getTranslation(language);

  // Strictly empty inputs: No prefilled default values
  const [form, setForm] = useState<ManualSoilForm>({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    temperature: '',
    humidity: '',
    rainfall: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Nitrogen check
    if (!form.nitrogen.trim()) {
      newErrors.nitrogen = t.valEnterNitrogen;
    } else {
      const n = parseFloat(form.nitrogen);
      if (isNaN(n) || n < 0 || n > 250) {
        newErrors.nitrogen = t.valEnterNitrogen;
      }
    }

    // Phosphorus check
    if (!form.phosphorus.trim()) {
      newErrors.phosphorus = t.valEnterPhosphorus;
    } else {
      const p = parseFloat(form.phosphorus);
      if (isNaN(p) || p < 0 || p > 250) {
        newErrors.phosphorus = t.valEnterPhosphorus;
      }
    }

    // Potassium check
    if (!form.potassium.trim()) {
      newErrors.potassium = t.valEnterPotassium;
    } else {
      const k = parseFloat(form.potassium);
      if (isNaN(k) || k < 0 || k > 250) {
        newErrors.potassium = t.valEnterPotassium;
      }
    }

    // pH check
    if (!form.ph.trim()) {
      newErrors.ph = t.valEnterPh;
    } else {
      const phVal = parseFloat(form.ph);
      if (isNaN(phVal) || phVal < 3.5 || phVal > 9.5) {
        newErrors.ph = t.valEnterPh;
      }
    }

    // Optional climate validation if farmer provided any
    if (form.temperature.trim()) {
      const temp = parseFloat(form.temperature);
      if (isNaN(temp) || temp < 0 || temp > 55) {
        newErrors.temperature = language === 'te' ? 'దయచేసి సరైన ఉష్ణోగ్రత నమోదు చేయండి (0°C నుండి 55°C).' : (language === 'hi' ? 'कृपया सही तापमान दर्ज करें (0°C से 55°C)।' : 'Please enter valid temperature between 0°C and 55°C.');
      }
    }

    if (form.humidity.trim()) {
      const hum = parseFloat(form.humidity);
      if (isNaN(hum) || hum < 5 || hum > 100) {
        newErrors.humidity = language === 'te' ? 'దయచేసి తేమ శాతం నమోదు చేయండి (5% నుండి 100%).' : (language === 'hi' ? 'कृपया नमी प्रतिशत दर्ज करें (5% से 100%)।' : 'Please enter valid humidity percentage between 5% and 100%.');
      }
    }

    if (form.rainfall.trim()) {
      const rain = parseFloat(form.rainfall);
      if (isNaN(rain) || rain < 0 || rain > 3500) {
        newErrors.rainfall = language === 'te' ? 'దయచేసి వర్షపాతం నమోదు చేయండి (0 నుండి 3500 మి.మీ).' : (language === 'hi' ? 'कृपया वर्षा दर्ज करें (0 से 3500 मिमी)।' : 'Please enter valid rainfall between 0 and 3500 mm.');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ManualSoilForm, val: string) => {
    setForm(prev => ({
      ...prev,
      [field]: val
    }));
    if (errors[field]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleReset = () => {
    setForm({
      nitrogen: '',
      phosphorus: '',
      potassium: '',
      ph: '',
      temperature: '',
      humidity: '',
      rainfall: ''
    });
    setErrors({});
    setResult(null);
    stopSpeaking();
    setIsSpeaking(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const n = parseFloat(form.nitrogen);
    const p = parseFloat(form.phosphorus);
    const k = parseFloat(form.potassium);
    const ph = parseFloat(form.ph);
    const temp = form.temperature.trim() ? parseFloat(form.temperature) : undefined;
    const hum = form.humidity.trim() ? parseFloat(form.humidity) : undefined;
    const rain = form.rainfall.trim() ? parseFloat(form.rainfall) : undefined;

    const soilInputs: SoilInputs = {
      nitrogen: n,
      phosphorus: p,
      potassium: k,
      ph: ph,
      temperature: temp || 26,
      humidity: hum || 65,
      rainfall: rain || 150
    };

    const rec = recommendBySoil(soilInputs, language);
    setResult(rec);
    onRecommendationGenerated(rec);
  };

  // Text-to-Speech playback of entire recommendation
  const handleToggleAudio = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else if (result) {
      setIsSpeaking(true);
      const locCrop = getLocalizedCrop(result.crop.id, language);
      let spokenText = '';
      if (language === 'te') {
        spokenText = `సిఫార్సు చేయబడిన పంట: ${locCrop.name}. అనుకూలత: ${result.matchPercentage} శాతం. కాలం: ${locCrop.season}. ${result.farmerAdvice[0] || ''}`;
      } else if (language === 'hi') {
        spokenText = `अनुशंसित फसल: ${locCrop.name}. उपयुक्तता: ${result.matchPercentage} प्रतिशत. मौसम: ${locCrop.season}. ${result.farmerAdvice[0] || ''}`;
      } else {
        spokenText = `Recommended crop is ${locCrop.name}. Suitability score is ${result.matchPercentage} percent. Season is ${locCrop.season}. ${result.farmerAdvice[0] || ''}`;
      }
      speakText(spokenText, language, () => {
        setIsSpeaking(false);
      });
    }
  };

  const localizedMainCrop = result ? getLocalizedCrop(result.crop.id, language) : null;

  return (
    <div className="space-y-8">
      {/* Soil Lab Input Form */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <div className="flex items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 font-serif">
                {t.manualSoilHeader}
              </h2>
              <p className="text-xs text-neutral-600 mt-0.5">
                {t.manualSoilNotice}
              </p>
            </div>
          </div>
          {(form.nitrogen || form.phosphorus || form.potassium || form.ph || result) && (
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{language === 'te' ? 'ఖాళీ చేయండి' : (language === 'hi' ? 'रीसेट करें' : 'Reset')}</span>
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Primary Required Soil Nutrients */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>{language === 'te' ? 'అవసరమైన మట్టి పరీక్ష విలువలు (తప్పనిసరి)' : (language === 'hi' ? 'आवश्यक मृदा परीक्षण मान (अनिवार्य)' : 'Required Soil Test Values (Mandatory)')}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Nitrogen */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-neutral-800">
                    {t.nitrogen} <span className="text-red-600">*</span>
                  </label>
                  <AudioSpeakerButton
                    termKey="nitrogen"
                    language={language}
                    title={language === 'te' ? 'నత్రజని గురించి వినండి' : (language === 'hi' ? 'नाइट्रोजन के बारे में सुनें' : 'Listen about Nitrogen')}
                  />
                </div>
                <input
                  type="number"
                  step="any"
                  value={form.nitrogen}
                  onChange={e => handleInputChange('nitrogen', e.target.value)}
                  placeholder={language === 'te' ? 'ఉదా. 80' : (language === 'hi' ? 'उदा. 80' : 'e.g. 80')}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-semibold tabular-nums focus:outline-none focus:ring-2 ${
                    errors.nitrogen ? 'border-red-500 ring-1 ring-red-300' : 'border-neutral-300 focus:ring-emerald-500'
                  }`}
                />
                {errors.nitrogen && (
                  <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.nitrogen}</span>
                  </p>
                )}
              </div>

              {/* Phosphorus */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-neutral-800">
                    {t.phosphorus} <span className="text-red-600">*</span>
                  </label>
                  <AudioSpeakerButton
                    termKey="phosphorus"
                    language={language}
                    title={language === 'te' ? 'భాస్వరం గురించి వినండి' : (language === 'hi' ? 'फास्फोरस के बारे में सुनें' : 'Listen about Phosphorus')}
                  />
                </div>
                <input
                  type="number"
                  step="any"
                  value={form.phosphorus}
                  onChange={e => handleInputChange('phosphorus', e.target.value)}
                  placeholder={language === 'te' ? 'ఉదా. 42' : (language === 'hi' ? 'उदा. 42' : 'e.g. 42')}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-semibold tabular-nums focus:outline-none focus:ring-2 ${
                    errors.phosphorus ? 'border-red-500 ring-1 ring-red-300' : 'border-neutral-300 focus:ring-emerald-500'
                  }`}
                />
                {errors.phosphorus && (
                  <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.phosphorus}</span>
                  </p>
                )}
              </div>

              {/* Potassium */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-neutral-800">
                    {t.potassium} <span className="text-red-600">*</span>
                  </label>
                  <AudioSpeakerButton
                    termKey="potassium"
                    language={language}
                    title={language === 'te' ? 'పొటాషియం గురించి వినండి' : (language === 'hi' ? 'पोटाश के बारे में सुनें' : 'Listen about Potassium')}
                  />
                </div>
                <input
                  type="number"
                  step="any"
                  value={form.potassium}
                  onChange={e => handleInputChange('potassium', e.target.value)}
                  placeholder={language === 'te' ? 'ఉదా. 45' : (language === 'hi' ? 'उदा. 45' : 'e.g. 45')}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-semibold tabular-nums focus:outline-none focus:ring-2 ${
                    errors.potassium ? 'border-red-500 ring-1 ring-red-300' : 'border-neutral-300 focus:ring-emerald-500'
                  }`}
                />
                {errors.potassium && (
                  <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.potassium}</span>
                  </p>
                )}
              </div>

              {/* Soil pH */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-neutral-800">
                    {t.ph} <span className="text-red-600">*</span>
                  </label>
                  <AudioSpeakerButton
                    termKey="ph"
                    language={language}
                    title={language === 'te' ? 'నేల పిహెచ్ గురించి వినండి' : (language === 'hi' ? 'मृदा पीएच के बारे में सुनें' : 'Listen about pH')}
                  />
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={form.ph}
                  onChange={e => handleInputChange('ph', e.target.value)}
                  placeholder={language === 'te' ? 'ఉదా. 6.5' : (language === 'hi' ? 'उदा. 6.5' : 'e.g. 6.5')}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-semibold tabular-nums focus:outline-none focus:ring-2 ${
                    errors.ph ? 'border-red-500 ring-1 ring-red-300' : 'border-neutral-300 focus:ring-emerald-500'
                  }`}
                />
                {errors.ph && (
                  <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.ph}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Optional Farm Climate Parameters with Audio Speaker */}
          <div className="pt-4 border-t border-neutral-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-3 flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-neutral-500" />
              <span>{language === 'te' ? 'ప్రాంతీయ వాతావరణం (ఐచ్ఛికం - తెలిస్తే నమోదు చేయండి)' : (language === 'hi' ? 'क्षेत्रीय मौसम (वैकल्पिक - यदि ज्ञात हो)' : 'Seasonal Climate (Optional - Enter if available)')}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Temperature */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-neutral-700">
                    {t.temperature}
                  </label>
                  <AudioSpeakerButton
                    termKey="temperature"
                    language={language}
                    title={language === 'te' ? 'ఉష్ణోగ్రత గురించి వినండి' : (language === 'hi' ? 'तापमान के बारे में सुनें' : 'Listen about Temperature')}
                  />
                </div>
                <input
                  type="number"
                  step="any"
                  value={form.temperature}
                  onChange={e => handleInputChange('temperature', e.target.value)}
                  placeholder={language === 'te' ? 'ఉదా. 28' : (language === 'hi' ? 'उदा. 28' : 'e.g. 28')}
                  className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.temperature && <p className="text-[11px] text-red-600 mt-1">{errors.temperature}</p>}
              </div>

              {/* Humidity */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-neutral-700">
                    {t.humidity}
                  </label>
                  <AudioSpeakerButton
                    termKey="humidity"
                    language={language}
                    title={language === 'te' ? 'తేమ గురించి వినండి' : (language === 'hi' ? 'नमी के बारे में सुनें' : 'Listen about Humidity')}
                  />
                </div>
                <input
                  type="number"
                  step="any"
                  value={form.humidity}
                  onChange={e => handleInputChange('humidity', e.target.value)}
                  placeholder={language === 'te' ? 'ఉదా. 70' : (language === 'hi' ? 'उदा. 70' : 'e.g. 70')}
                  className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.humidity && <p className="text-[11px] text-red-600 mt-1">{errors.humidity}</p>}
              </div>

              {/* Rainfall */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-neutral-700">
                    {t.rainfall}
                  </label>
                  <AudioSpeakerButton
                    termKey="rainfall"
                    language={language}
                    title={language === 'te' ? 'వర్షపాతం గురించి వినండి' : (language === 'hi' ? 'वर्षा के बारे में सुनें' : 'Listen about Rainfall')}
                  />
                </div>
                <input
                  type="number"
                  step="any"
                  value={form.rainfall}
                  onChange={e => handleInputChange('rainfall', e.target.value)}
                  placeholder={language === 'te' ? 'ఉదా. 150' : (language === 'hi' ? 'उदा. 150' : 'e.g. 150')}
                  className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.rainfall && <p className="text-[11px] text-red-600 mt-1">{errors.rainfall}</p>}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-bold shadow-sm transition-all"
            >
              {t.getRecommendation}
            </button>
          </div>
        </form>
      </div>

      {/* Recommendation Results (Strict single-language) */}
      {result && localizedMainCrop && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-emerald-300 p-6 shadow-md relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 mb-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.recommendedCrop}</span>
                </div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 font-serif">
                    {localizedMainCrop.name}
                  </h3>
                  <AudioSpeakerButton
                    customText={`${localizedMainCrop.name}. ${localizedMainCrop.description}`}
                    language={language}
                    title={language === 'te' ? 'పంట వివరాలు వినండి' : (language === 'hi' ? 'फसल विवरण सुनें' : 'Listen')}
                  />
                </div>
                <p className="text-xs text-neutral-600 mt-1">
                  {language === 'te' ? 'వర్గం' : (language === 'hi' ? 'वर्ग' : 'Category')}: {localizedMainCrop.category} • {language === 'te' ? 'కాలం' : (language === 'hi' ? 'मौसम' : 'Season')}: {localizedMainCrop.season}
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
                  title="Listen to recommendation"
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

            {/* Quick Metrics */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                <span className="text-[11px] text-neutral-500 font-semibold block">
                  {language === 'te' ? 'పంట కాల పరిమితి' : (language === 'hi' ? 'फसल अवधि' : 'Duration')}
                </span>
                <span className="text-sm font-bold text-neutral-900 mt-0.5 block">{result.crop.durationDays}</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                <span className="text-[11px] text-neutral-500 font-semibold block">
                  {t.waterAvailability}
                </span>
                <span className="text-sm font-bold text-neutral-900 mt-0.5 block">
                  {localizedMainCrop.waterRequirement}
                </span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                <span className="text-[11px] text-neutral-500 font-semibold block">
                  {language === 'te' ? 'ఆదర్శవంతమైన నేల పిహెచ్' : (language === 'hi' ? 'आदर्श मृदा पीएच' : 'Optimal pH')}
                </span>
                <span className="text-sm font-bold text-neutral-900 mt-0.5 block">
                  {result.crop.optimalPh} (±0.5)
                </span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                <span className="text-[11px] text-neutral-500 font-semibold block">
                  {language === 'te' ? 'ఉష్ణోగ్రత పరిధి' : (language === 'hi' ? 'तापमान सीमा' : 'Temperature')}
                </span>
                <span className="text-sm font-bold text-neutral-900 mt-0.5 block">
                  {result.crop.minTemp}°C - {result.crop.maxTemp}°C
                </span>
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
                    ? 'మీరు నమోదు చేసిన మట్టి పరీక్ష విలువలకు అనుగుణంగా ఏ పోషకాలు సమృద్ధిగా ఉన్నాయో, ఏవి లోపించాయో స్పష్టమైన పోలిక.'
                    : language === 'hi'
                    ? 'आपके द्वारा दर्ज मृदा परीक्षण अनुसार कौन से पोषक तत्व पर्याप्त हैं और फसल को किन तत्वों की कमी है।'
                    : 'Clear breakdown of nutrients present in your soil versus specific requirements of the crop.'}
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
                      {language === 'te' ? 'నేలలో ఉన్నది (మీ విలువల ప్రకారం)' : language === 'hi' ? 'मिट्टी में उपलब्ध (आपके मान)' : 'Soil Has (Your Input)'}
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
              <Layers className="w-5 h-5 text-emerald-600" />
              <span>{t.fertilizerAdvisory}</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.fertilizerOptions.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-neutral-900">{item.nutrient}</span>
                      <div className="flex items-center gap-1.5">
                        <AudioSpeakerButton
                          customText={`${item.nutrient}. ${item.fertilizer}. ${item.action}`}
                          language={language}
                          title="Listen"
                        />
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
                    <span className="flex-1">{advice}</span>
                    <AudioSpeakerButton
                      customText={advice}
                      language={language}
                      title="Listen"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Alternative Suitable Crops */}
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
                      <div className="flex items-center justify-between mt-1">
                        <h5 className="text-base font-bold text-neutral-900">{altLoc.name}</h5>
                        <AudioSpeakerButton
                          customText={`${altLoc.name}. ${altLoc.category}. ${altLoc.season}`}
                          language={language}
                          title="Listen"
                        />
                      </div>
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
