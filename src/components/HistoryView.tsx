import React, { useState } from 'react';
import { History, Trash2, Printer, ArrowRight } from 'lucide-react';
import { LanguageCode, RecommendationResult } from '../types';
import { getTranslation } from '../data/translations';
import { getLocalizedCrop } from '../utils/cropLocalization';

interface HistoryViewProps {
  language: LanguageCode;
  recommendations: RecommendationResult[];
  onOpenReport: (rec: RecommendationResult) => void;
  onClearHistory: () => void;
  onNavigate: (tab: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  language,
  recommendations,
  onOpenReport,
  onClearHistory,
  onNavigate
}) => {
  const t = getTranslation(language);
  const [confirmClear, setConfirmClear] = useState(false);

  const labels = language === 'te' ? {
    title: 'సిఫార్సుల చరిత్ర',
    subtitle: 'గతంలో చేసిన పంట విశ్లేషణలు మరియు అధికారిక సిఫార్సు నివేదికలను ఇక్కడ చూడవచ్చు.',
    confirmQuestion: 'అన్నింటినీ తొలగించాలా?',
    confirmYes: 'అవును, తొలగించు',
    cancel: 'రద్దు చేయి',
    clearHistory: 'చరిత్రను తొలగించండి',
    soilMode: 'మట్టి పరీక్ష విధానం',
    regionMode: 'ప్రాంతీయ విధానం',
    match: 'అనుకూలత',
    viewReport: 'పూర్తి నివేదిక చూడండి',
    emptyTitle: 'ఇంకా ఎలాంటి సిఫార్సులు లేవు',
    emptyDesc: 'మట్టి వివరాలు లేదా మీ ప్రాంతాన్ని ఎంచుకుని సిఫార్సు పొందండి.',
    startSoilBtn: 'మట్టి పరీక్షతో ప్రారంభించండి',
    startRegionBtn: 'ప్రాంతం ద్వారా పొందండి',
    location: 'ప్రాంతం'
  } : language === 'hi' ? {
    title: 'अनुशंसा इतिहास एवं लॉग्स',
    subtitle: 'पूर्व में किए गए मृदा विश्लेषण व आधिकारिक फसल अनुशंसा प्रमाण-पत्र देखें।',
    confirmQuestion: 'क्या सारा इतिहास हटाना चाहते हैं?',
    confirmYes: 'हाँ, हटाएं',
    cancel: 'रद्द करें',
    clearHistory: 'इतिहास साफ़ करें',
    soilMode: 'मृदा परीक्षण माध्यम',
    regionMode: 'क्षेत्रीय माध्यम',
    match: 'अनुकूलता',
    viewReport: 'रिपोर्ट देखें',
    emptyTitle: 'कोई पूर्व अनुशंसा उपलब्ध नहीं है',
    emptyDesc: 'मृदा परीक्षण मान दर्ज करके अथवा अपना क्षेत्र चुनकर तत्काल अनुशंसा प्राप्त करें।',
    startSoilBtn: 'मृदा परीक्षण से शुरू करें',
    startRegionBtn: 'क्षेत्रीय आधार पर चुनें',
    location: 'स्थान'
  } : {
    title: 'Recommendation History & Logs',
    subtitle: 'Review past farm analyses, compare seasonal crop suggestions, and reprint official certificates.',
    confirmQuestion: 'Confirm clear all?',
    confirmYes: 'Yes, Clear',
    cancel: 'Cancel',
    clearHistory: 'Clear History',
    soilMode: 'Soil Test Mode',
    regionMode: 'Region Mode',
    match: 'Match',
    viewReport: 'View Full Report',
    emptyTitle: 'No recommendations generated yet',
    emptyDesc: 'Run a crop analysis using your soil test values or regional agro-climatic profile to view history logs.',
    startSoilBtn: 'Start with Soil Test',
    startRegionBtn: 'Select by Region',
    location: 'Location'
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <History className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 font-serif">
                {labels.title}
              </h2>
              <p className="text-xs text-neutral-600 mt-0.5">
                {labels.subtitle}
              </p>
            </div>
          </div>

          {recommendations.length > 0 && (
            <div>
              {confirmClear ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-red-600 font-bold">{labels.confirmQuestion}</span>
                  <button
                    onClick={() => {
                      onClearHistory();
                      setConfirmClear(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
                  >
                    {labels.confirmYes}
                  </button>
                  <button
                    onClick={() => setConfirmClear(false)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-200 hover:bg-neutral-300 text-neutral-700 text-xs font-semibold"
                  >
                    {labels.cancel}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmClear(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-100 hover:bg-red-50 hover:text-red-700 text-neutral-600 text-xs font-semibold border border-neutral-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{labels.clearHistory}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* History Items List */}
      {recommendations.length > 0 ? (
        <div className="space-y-4">
          {recommendations.map(rec => {
            const locCrop = getLocalizedCrop(rec.crop.id, language);
            const dateStr = new Date(rec.timestamp).toLocaleDateString(
              language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN',
              {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }
            );

            return (
              <div
                key={rec.id}
                className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono text-neutral-400">
                      {dateStr}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      rec.mode === 'soil'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {rec.mode === 'soil' ? labels.soilMode : labels.regionMode}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                      {labels.match}: {rec.matchPercentage}%
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-neutral-900 font-serif">
                    {locCrop.name}
                  </h3>

                  <div className="text-xs text-neutral-600 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>N: <strong>{rec.soilValues.nitrogen}</strong></span>
                    <span>P: <strong>{rec.soilValues.phosphorus}</strong></span>
                    <span>K: <strong>{rec.soilValues.potassium}</strong></span>
                    <span>pH: <strong>{rec.soilValues.ph}</strong></span>
                    <span>Temp: <strong>{rec.weatherValues.temperature}°C</strong></span>
                    <span>Rainfall: <strong>{rec.weatherValues.rainfall} mm</strong></span>
                  </div>

                  {rec.regionDetails && (
                    <p className="text-[11px] text-neutral-500">
                      {labels.location}: {rec.regionDetails.district}, {rec.regionDetails.state}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => onOpenReport(rec)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{labels.viewReport}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center max-w-xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-4">
            <History className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-neutral-800 font-serif">
            {labels.emptyTitle}
          </h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
            {labels.emptyDesc}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('soil')}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors"
            >
              {labels.startSoilBtn}
            </button>
            <button
              onClick={() => onNavigate('region')}
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-semibold border border-neutral-300 transition-colors"
            >
              {labels.startRegionBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
