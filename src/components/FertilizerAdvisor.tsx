import React, { useState } from 'react';
import { Sparkles, AlertCircle, Volume2, Square, CheckCircle2, ArrowRight } from 'lucide-react';
import { FertilizerItem, LanguageCode } from '../types';
import { CROPS_DATA } from '../data/crops';
import { getTranslation } from '../data/translations';
import { generateFertilizerGuidance } from '../utils/recommender';
import { speakText, stopSpeaking } from '../utils/speech';
import { getCropName } from '../utils/cropLocalization';
import { AudioSpeakerButton } from './AudioSpeakerButton';

interface FertilizerAdvisorProps {
  language: LanguageCode;
}

export const FertilizerAdvisor: React.FC<FertilizerAdvisorProps> = ({ language }) => {
  const t = getTranslation(language);

  // NO default numbers
  const [n, setN] = useState<string>('');
  const [p, setP] = useState<string>('');
  const [k, setK] = useState<string>('');
  const [selectedCropId, setSelectedCropId] = useState<string>(CROPS_DATA[0].id);

  const [guidance, setGuidance] = useState<FertilizerItem[] | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!n.trim()) errs.n = t.valEnterNitrogen;
    if (!p.trim()) errs.p = t.valEnterPhosphorus;
    if (!k.trim()) errs.k = t.valEnterPotassium;

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    const nVal = parseFloat(n);
    const pVal = parseFloat(p);
    const kVal = parseFloat(k);

    const cropName = getCropName(selectedCropId, language);
    const result = generateFertilizerGuidance(nVal, pVal, kVal, cropName, language);
    setGuidance(result);
  };

  const handleToggleAudio = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else if (guidance && guidance.length > 0) {
      setIsSpeaking(true);
      const cropName = getCropName(selectedCropId, language);
      let text = '';
      if (language === 'te') {
        text = `${cropName} పంటకు ఎరువుల సలహా: ${guidance[0].nutrient} ${guidance[0].status} - ${guidance[0].action}. ${guidance[1].nutrient} ${guidance[1].status}. ${guidance[2].nutrient} ${guidance[2].status}.`;
      } else if (language === 'hi') {
        text = `${cropName} के लिए उर्वरक परामर्श: ${guidance[0].nutrient} ${guidance[0].status} - ${guidance[0].action}। ${guidance[1].nutrient} ${guidance[1].status}। ${guidance[2].nutrient} ${guidance[2].status}।`;
      } else {
        text = `Fertilizer Guidance for ${cropName}. ${guidance[0].nutrient} is ${guidance[0].status}: ${guidance[0].fertilizer}. ${guidance[1].nutrient} is ${guidance[1].status}. ${guidance[2].nutrient} is ${guidance[2].status}.`;
      }

      speakText(text, language, () => {
        setIsSpeaking(false);
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 font-serif">
                {language === 'te' ? 'శాస్త్రీయ సమతుల్య ఎరువుల మార్గదర్శక వ్యవస్థ' : (language === 'hi' ? 'संतुलित उर्वरक मार्गदर्शन प्रणाली' : 'Balanced Fertilizer Guidance System')}
              </h2>
              <p className="text-xs text-neutral-600 mt-0.5">
                {language === 'te'
                  ? 'మట్టిలోని నత్రజని, భాస్వరం, పొటాషియం స్థాయిలను నమోదు చేసి సరైన ఎరువుల సలహాను పొందండి.'
                  : language === 'hi'
                  ? 'मृदा में नाइट्रोजन, फास्फोरस व पोटाश स्तर दर्ज कर सटीक उर्वरक सलाह प्राप्त करें।'
                  : 'Scientific NPK analysis preventing chemical soil exhaustion.'}
              </p>
            </div>
          </div>

          {guidance && (
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${
                isSpeaking ? 'bg-red-600 text-white animate-pulse' : 'bg-blue-700 hover:bg-blue-800 text-white'
              }`}
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
          )}
        </div>

        {/* Input Form (Empty by Default) */}
        <form onSubmit={handleCalculate} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {language === 'te' ? 'పంటను ఎంచుకోండి' : (language === 'hi' ? 'लक्षित फसल चुनें' : 'Target Crop')}
              </label>
              <select
                value={selectedCropId}
                onChange={e => setSelectedCropId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-neutral-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {CROPS_DATA.map(c => (
                  <option key={c.id} value={c.id}>
                    {getCropName(c.id, language)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-neutral-700">
                  {t.nitrogen} <span className="text-red-600">*</span>
                </label>
                <AudioSpeakerButton
                  termKey="nitrogen"
                  language={language}
                />
              </div>
              <input
                type="number"
                value={n}
                onChange={e => {
                  setN(e.target.value);
                  if (errors.n) setErrors(prev => ({ ...prev, n: '' }));
                }}
                placeholder={language === 'te' ? 'ఉదా. 35' : (language === 'hi' ? 'उदा. 35' : 'e.g. 35')}
                className={`w-full px-3 py-2.5 rounded-lg border text-sm font-semibold focus:outline-none focus:ring-2 ${
                  errors.n ? 'border-red-500 ring-1 ring-red-300' : 'border-neutral-300 focus:ring-blue-500'
                }`}
              />
              {errors.n && <p className="text-[11px] text-red-600 mt-1">{errors.n}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-neutral-700">
                  {t.phosphorus} <span className="text-red-600">*</span>
                </label>
                <AudioSpeakerButton
                  termKey="phosphorus"
                  language={language}
                />
              </div>
              <input
                type="number"
                value={p}
                onChange={e => {
                  setP(e.target.value);
                  if (errors.p) setErrors(prev => ({ ...prev, p: '' }));
                }}
                placeholder={language === 'te' ? 'ఉదా. 45' : (language === 'hi' ? 'उदा. 45' : 'e.g. 45')}
                className={`w-full px-3 py-2.5 rounded-lg border text-sm font-semibold focus:outline-none focus:ring-2 ${
                  errors.p ? 'border-red-500 ring-1 ring-red-300' : 'border-neutral-300 focus:ring-blue-500'
                }`}
              />
              {errors.p && <p className="text-[11px] text-red-600 mt-1">{errors.p}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-neutral-700">
                  {t.potassium} <span className="text-red-600">*</span>
                </label>
                <AudioSpeakerButton
                  termKey="potassium"
                  language={language}
                />
              </div>
              <input
                type="number"
                value={k}
                onChange={e => {
                  setK(e.target.value);
                  if (errors.k) setErrors(prev => ({ ...prev, k: '' }));
                }}
                placeholder={language === 'te' ? 'ఉదా. 60' : (language === 'hi' ? 'उदा. 60' : 'e.g. 60')}
                className={`w-full px-3 py-2.5 rounded-lg border text-sm font-semibold focus:outline-none focus:ring-2 ${
                  errors.k ? 'border-red-500 ring-1 ring-red-300' : 'border-neutral-300 focus:ring-blue-500'
                }`}
              />
              {errors.k && <p className="text-[11px] text-red-600 mt-1">{errors.k}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold shadow-sm transition-all"
            >
              {language === 'te' ? 'ఎరువుల సలహాను లెక్కించండి' : (language === 'hi' ? 'उर्वरक सलाह की गणना करें' : 'Calculate Fertilizer Guidance')}
            </button>
          </div>
        </form>
      </div>

      {/* Guidance Cards */}
      {guidance && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guidance.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-neutral-100">
                  <h3 className="text-base font-bold text-neutral-900">{item.nutrient}</h3>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded ${
                    item.status === 'Deficient' || item.status === 'లోపం' || item.status === 'कमी'
                      ? 'bg-amber-100 text-amber-800'
                      : item.status === 'Excess' || item.status === 'అధికం' || item.status === 'अधिकता'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="mb-3">
                  <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                    {language === 'te' ? 'సిఫార్సు చేయబడిన ఎరువు' : (language === 'hi' ? 'अनुशंसित उर्वरक' : 'Recommended Fertilizer')}
                  </span>
                  <div className="text-sm font-bold text-emerald-800 mt-0.5">{item.fertilizer}</div>
                </div>

                <p className="text-xs text-neutral-600 mb-3 leading-relaxed">{item.reason}</p>
                <p className="text-xs text-neutral-700 mb-4 leading-relaxed bg-neutral-50 p-2.5 rounded border border-neutral-100">{item.benefit}</p>
              </div>

              <div className="pt-3 border-t border-neutral-100 text-xs font-semibold text-neutral-900">
                {item.action}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
