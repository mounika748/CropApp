import React, { useState } from 'react';
import { Layers, Activity, ShieldCheck, CheckCircle, AlertTriangle, Volume2, Square, Sparkles } from 'lucide-react';
import { LanguageCode, SoilHealthReport } from '../types';
import { getTranslation } from '../data/translations';
import { evaluateSoilHealth } from '../utils/recommender';
import { speakText, stopSpeaking } from '../utils/speech';
import { AudioSpeakerButton } from './AudioSpeakerButton';

interface SoilHealthProps {
  language: LanguageCode;
}

export const SoilHealth: React.FC<SoilHealthProps> = ({ language }) => {
  const t = getTranslation(language);

  // NO default numbers
  const [n, setN] = useState<string>('');
  const [p, setP] = useState<string>('');
  const [k, setK] = useState<string>('');
  const [ph, setPh] = useState<string>('');

  const [report, setReport] = useState<SoilHealthReport | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!n.trim()) errs.n = t.valEnterNitrogen;
    if (!p.trim()) errs.p = t.valEnterPhosphorus;
    if (!k.trim()) errs.k = t.valEnterPotassium;
    if (!ph.trim()) errs.ph = t.valEnterPh;

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    const nVal = parseFloat(n);
    const pVal = parseFloat(p);
    const kVal = parseFloat(k);
    const phVal = parseFloat(ph);

    const res = evaluateSoilHealth(nVal, pVal, kVal, phVal, language);
    setReport(res);
  };

  const handleToggleAudio = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else if (report) {
      setIsSpeaking(true);
      let text = '';
      if (language === 'te') {
        text = `నేల ఆరోగ్య నివేదిక: మొత్తం స్కోరు 100 కి ${report.overallScore}. నేల పిహెచ్ స్థితి ${report.phStatus}. ${report.advice[0] || ''} ${report.amendments[0] || ''}`;
      } else if (language === 'hi') {
        text = `मृदा स्वास्थ्य रिपोर्ट: कुल स्कोर 100 में से ${report.overallScore} है। पीएच स्थिति ${report.phStatus} है। ${report.advice[0] || ''} ${report.amendments[0] || ''}`;
      } else {
        text = `Soil Health Report. Overall health score is ${report.overallScore} out of 100. Soil pH status is ${report.phStatus}. ${report.advice[0] || ''} ${report.amendments[0] || ''}`;
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
            <div className="w-12 h-12 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 font-serif">
                {language === 'te' ? 'నేల ఆరోగ్య నిర్ధారణ మరియు సవరణల నివేదిక' : (language === 'hi' ? 'मृदा स्वास्थ्य विश्लेषण एवं सुधार रिपोर्ट' : 'Soil Health Diagnostic & Amendments')}
              </h2>
              <p className="text-xs text-neutral-600 mt-0.5">
                {language === 'te'
                  ? 'మీ మట్టి పరీక్ష విలువల ఆధారంగా నేల ఆరోగ్య స్కోరు మరియు అవసరమైన సవరణలను తెలుసుకోండి.'
                  : language === 'hi'
                  ? 'अपनी मृदा रिपोर्ट के आधार पर स्वास्थ्य स्कोर व आवश्यक सुधार जानें।'
                  : 'Evaluate comprehensive soil biological vitality and corrective chemical amendments.'}
              </p>
            </div>
          </div>

          {report && (
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${
                isSpeaking ? 'bg-red-600 text-white animate-pulse' : 'bg-teal-700 hover:bg-teal-800 text-white'
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

        {/* Input Form (Empty by default) */}
        <form onSubmit={handleEvaluate} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-neutral-700">
                  {t.nitrogen} <span className="text-red-600">*</span>
                </label>
                <AudioSpeakerButton termKey="nitrogen" language={language} />
              </div>
              <input
                type="number"
                value={n}
                onChange={e => {
                  setN(e.target.value);
                  if (errors.n) setErrors(prev => ({ ...prev, n: '' }));
                }}
                placeholder={language === 'te' ? 'ఉదా. 75' : (language === 'hi' ? 'उदा. 75' : 'e.g. 75')}
                className={`w-full px-3 py-2.5 rounded-lg border text-sm font-semibold focus:outline-none focus:ring-2 ${
                  errors.n ? 'border-red-500 ring-1 ring-red-300' : 'border-neutral-300 focus:ring-teal-500'
                }`}
              />
              {errors.n && <p className="text-[11px] text-red-600 mt-1">{errors.n}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-neutral-700">
                  {t.phosphorus} <span className="text-red-600">*</span>
                </label>
                <AudioSpeakerButton termKey="phosphorus" language={language} />
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
                  errors.p ? 'border-red-500 ring-1 ring-red-300' : 'border-neutral-300 focus:ring-teal-500'
                }`}
              />
              {errors.p && <p className="text-[11px] text-red-600 mt-1">{errors.p}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-neutral-700">
                  {t.potassium} <span className="text-red-600">*</span>
                </label>
                <AudioSpeakerButton termKey="potassium" language={language} />
              </div>
              <input
                type="number"
                value={k}
                onChange={e => {
                  setK(e.target.value);
                  if (errors.k) setErrors(prev => ({ ...prev, k: '' }));
                }}
                placeholder={language === 'te' ? 'ఉదా. 50' : (language === 'hi' ? 'उदा. 50' : 'e.g. 50')}
                className={`w-full px-3 py-2.5 rounded-lg border text-sm font-semibold focus:outline-none focus:ring-2 ${
                  errors.k ? 'border-red-500 ring-1 ring-red-300' : 'border-neutral-300 focus:ring-teal-500'
                }`}
              />
              {errors.k && <p className="text-[11px] text-red-600 mt-1">{errors.k}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-neutral-700">
                  {t.ph} <span className="text-red-600">*</span>
                </label>
                <AudioSpeakerButton termKey="ph" language={language} />
              </div>
              <input
                type="number"
                step="0.1"
                value={ph}
                onChange={e => {
                  setPh(e.target.value);
                  if (errors.ph) setErrors(prev => ({ ...prev, ph: '' }));
                }}
                placeholder={language === 'te' ? 'ఉదా. 6.5' : (language === 'hi' ? 'उदा. 6.5' : 'e.g. 6.5')}
                className={`w-full px-3 py-2.5 rounded-lg border text-sm font-semibold focus:outline-none focus:ring-2 ${
                  errors.ph ? 'border-red-500 ring-1 ring-red-300' : 'border-neutral-300 focus:ring-teal-500'
                }`}
              />
              {errors.ph && <p className="text-[11px] text-red-600 mt-1">{errors.ph}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold shadow-sm transition-all"
            >
              {language === 'te' ? 'నేల ఆరోగ్యాన్ని విశ్లేషించండి' : (language === 'hi' ? 'मृदा स्वास्थ्य विश्लेषण करें' : 'Evaluate Soil Health')}
            </button>
          </div>
        </form>
      </div>

      {/* Health Report Card */}
      {report && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  {language === 'te' ? 'నేల ఆరోగ్య సూచిక' : (language === 'hi' ? 'मृदा स्वास्थ्य सूचकांक' : 'Soil Vitality Index')}
                </span>
                <div className="text-3xl font-black text-neutral-900 mt-1">
                  {report.overallScore} / 100
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold text-neutral-500 block">{t.ph}</span>
                <span className="text-base font-bold text-neutral-900">{report.phStatus}</span>
              </div>
            </div>

            {/* Nutrients Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-100">
                <span className="text-xs font-bold text-neutral-700 block mb-1">{t.nitrogen}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded inline-block ${
                  report.nitrogenStatus === 'Optimal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {report.nitrogenStatus === 'Optimal' ? t.optimal : (report.nitrogenStatus === 'Deficient' ? t.deficient : t.excess)}
                </span>
              </div>

              <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-100">
                <span className="text-xs font-bold text-neutral-700 block mb-1">{t.phosphorus}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded inline-block ${
                  report.phosphorusStatus === 'Optimal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {report.phosphorusStatus === 'Optimal' ? t.optimal : (report.phosphorusStatus === 'Deficient' ? t.deficient : t.excess)}
                </span>
              </div>

              <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-100">
                <span className="text-xs font-bold text-neutral-700 block mb-1">{t.potassium}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded inline-block ${
                  report.potassiumStatus === 'Optimal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {report.potassiumStatus === 'Optimal' ? t.optimal : (report.potassiumStatus === 'Deficient' ? t.deficient : t.excess)}
                </span>
              </div>
            </div>

            {/* Soil Amendments */}
            {report.amendments.length > 0 && (
              <div className="mt-6 pt-6 border-t border-neutral-100">
                <h4 className="text-sm font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-700" />
                  <span>{language === 'te' ? 'సిఫార్సు చేయబడిన నేల సవరణలు' : (language === 'hi' ? 'अनुशंसित मृदा सुधार उपाय' : 'Recommended Soil Amendments')}</span>
                </h4>
                <ul className="space-y-2">
                  {report.amendments.map((am, i) => (
                    <li key={i} className="text-xs text-neutral-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-700 mt-1.5 shrink-0" />
                      <span>{am}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* General Advice */}
            {report.advice.length > 0 && (
              <div className="mt-6 pt-6 border-t border-neutral-100">
                <h4 className="text-sm font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>{t.farmingAdvice}</span>
                </h4>
                <ul className="space-y-2">
                  {report.advice.map((adv, i) => (
                    <li key={i} className="text-xs text-neutral-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
