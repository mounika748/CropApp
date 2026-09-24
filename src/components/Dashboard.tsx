import React from 'react';
import { Sprout, FlaskConical, MapPin, Sparkles, CloudRain, Layers, History, ArrowRight } from 'lucide-react';
import { LanguageCode, RecommendationResult } from '../types';
import { getTranslation } from '../data/translations';
import { getCropName, getLocalizedCrop } from '../utils/cropLocalization';
import { AudioSpeakerButton } from './AudioSpeakerButton';

interface DashboardProps {
  language: LanguageCode;
  onNavigate: (tab: string) => void;
  recentRecommendations: RecommendationResult[];
  onOpenReport: (rec: RecommendationResult) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  language,
  onNavigate,
  recentRecommendations,
  onOpenReport
}) => {
  const t = getTranslation(language);
  const latestRec = recentRecommendations[0];
  const isTelugu = language === 'te';
  const isHindi = language === 'hi';

  const localizedLatestCrop = latestRec ? getLocalizedCrop(latestRec.crop.id, language) : null;

  return (
    <div className="space-y-8">
      {/* Top Welcome Card */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white shadow-lg border border-emerald-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800/80 text-emerald-200 border border-emerald-700/60 mb-3">
              <Sprout className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isTelugu ? 'వ్యక్తిగత వ్యవసాయ వేదిక' : (isHindi ? 'व्यक्तिगत कृषि पोर्टल' : 'Personalized Farm Intelligence Portal')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight">
              {isTelugu ? 'రైతు డ్యాష్‌బోర్డుకు స్వాగతం' : (isHindi ? 'किसान डैशबोर्ड में आपका स्वागत है' : 'Welcome to Your Kisan Dashboard')}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-emerald-200 max-w-xl">
              {isTelugu
                ? 'నేల పోషకాల సమతుల్యత, తాజా వాతావరణ సమాచారం మరియు పంట సలహాలను ఒకే చోట తెలుసుకోండి.'
                : (isHindi
                ? 'मृदा पोषक तत्व संतुलन, ताजा मौसम और फसल परामर्श की संपूर्ण जानकारी एक ही स्थान पर।'
                : 'Track your soil nutrient balances, monitor current weather conditions, and review crop advisories.')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('soil')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <FlaskConical className="w-4 h-4" />
              <span>{isTelugu ? 'మట్టి పరీక్ష నమోదు' : (isHindi ? 'मृदा परीक्षण दर्ज करें' : 'New Soil Test')}</span>
            </button>
            <button
              onClick={() => onNavigate('region')}
              className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-emerald-200 text-xs font-bold border border-emerald-700 shadow-md transition-all flex items-center gap-1.5"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{isTelugu ? 'ప్రాంతీయ విధానం' : (isHindi ? 'क्षेत्रीय प्रणाली' : 'Region Mode')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Metrics & Last Recommendation Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Recommendation Card */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                {isTelugu ? 'ఇటీవలి పంట సిఫార్సు' : (isHindi ? 'नवीनतम फसल अनुशंसा' : 'Latest Crop Advisory')}
              </span>
              {latestRec && (
                <span className="text-[11px] text-neutral-400 font-mono">
                  {new Date(latestRec.timestamp).toLocaleDateString(language === 'te' ? 'te-IN' : (language === 'hi' ? 'hi-IN' : 'en-IN'))}
                </span>
              )}
            </div>

            {latestRec && localizedLatestCrop ? (
              <div className="mt-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-black text-neutral-900 font-serif">
                        {localizedLatestCrop.name}
                      </h3>
                      <AudioSpeakerButton
                        customText={`${localizedLatestCrop.name}. ${localizedLatestCrop.description}`}
                        language={language}
                      />
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {localizedLatestCrop.category} • {isTelugu ? 'కాలం' : (isHindi ? 'मौसम' : 'Season')}: {localizedLatestCrop.season}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-neutral-500 font-semibold block">{t.suitabilityScore}</span>
                    <span className="text-2xl font-black text-emerald-700 tabular-nums">
                      {latestRec.matchPercentage}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs text-neutral-700 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">N-P-K</span>
                    <strong className="text-neutral-900 tabular-nums">
                      {latestRec.soilValues.nitrogen}-{latestRec.soilValues.phosphorus}-{latestRec.soilValues.potassium}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block">{t.ph}</span>
                    <strong className="text-neutral-900 tabular-nums">{latestRec.soilValues.ph}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block">{isTelugu ? 'కాలపరిమితి' : (isHindi ? 'अवधि' : 'Duration')}</span>
                    <strong className="text-neutral-900">{latestRec.crop.durationDays}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block">{t.waterAvailability}</span>
                    <strong className="text-neutral-900">{localizedLatestCrop.waterRequirement}</strong>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 line-clamp-2">
                  {latestRec.farmerAdvice[0]}
                </p>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-xs text-neutral-500">
                  {isTelugu
                    ? 'ఇంకా ఎలాంటి సిఫార్సు చేయబడలేదు. మట్టి పరీక్ష లేదా ప్రాంతీయ విధానాన్ని ఉపయోగించి విశ్లేషించండి.'
                    : (isHindi
                    ? 'अभी तक कोई अनुशंसा उपलब्ध नहीं है। मृदा परीक्षण या क्षेत्रीय विकल्प का उपयोग करें।'
                    : 'No recommendation generated yet. Run your first analysis using soil test or regional mode.')}
                </p>
                <button
                  onClick={() => onNavigate('soil')}
                  className="mt-3 px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800"
                >
                  {isTelugu ? 'మొదటి సిఫార్సును పొందండి' : (isHindi ? 'प्रथम अनुशंसा प्राप्त करें' : 'Generate First Recommendation')}
                </button>
              </div>
            )}
          </div>

          {latestRec && (
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
              <button
                onClick={() => onOpenReport(latestRec)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>{isTelugu ? 'పూర్తి నివేదికను చూడండి' : (isHindi ? 'पूर्ण रिपोर्ट देखें' : 'View Full Advisory Report')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] text-neutral-500 font-medium">
                {isTelugu ? 'విధానం' : (isHindi ? 'प्रणाली' : 'Mode')}: {latestRec.mode === 'soil' ? (isTelugu ? 'ప్రయోగశాల పరీక్ష' : (isHindi ? 'प्रयोगशाला जांच' : 'Soil Test')) : (isTelugu ? 'ప్రాంతీయ' : (isHindi ? 'क्षेत्रीय' : 'Regional'))}
              </span>
            </div>
          )}
        </div>

        {/* Quick Tools */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                {isTelugu ? 'త్వరిత సాధనాలు' : (isHindi ? 'त्वरित कृषि उपकरण' : 'Farm Quick Tools')}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div
                onClick={() => onNavigate('weather')}
                className="p-3 rounded-lg border border-sky-100 bg-sky-50/60 hover:bg-sky-50 transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <CloudRain className="w-5 h-5 text-sky-600" />
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900">
                      {isTelugu ? 'ప్రత్యక్ష వాతావరణం' : (isHindi ? 'लाइव मौसम पूर्वानुमान' : 'Farm Weather Forecast')}
                    </h4>
                    <p className="text-[11px] text-neutral-500">
                      {isTelugu ? 'వర్ష సూచన మరియు పిచికారీ సలహా' : (isHindi ? 'वर्षा व छिड़काव परामर्श' : 'Spray windows & rainfall alert')}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </div>

              <div
                onClick={() => onNavigate('fertilizer')}
                className="p-3 rounded-lg border border-blue-100 bg-blue-50/60 hover:bg-blue-50 transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900">
                      {isTelugu ? 'ఎరువుల కాలిక్యులేటర్' : (isHindi ? 'उर्वरक कैलकुलेटर' : 'Fertilizer Calculator')}
                    </h4>
                    <p className="text-[11px] text-neutral-500">
                      {isTelugu ? 'యూరియా, డిఎపి, పొటాష్ సలహా' : (isHindi ? 'यूरिया, डीएपी, पोटाश मार्गदर्शन' : 'Urea, DAP, MOP guidelines')}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </div>

              <div
                onClick={() => onNavigate('soil-health')}
                className="p-3 rounded-lg border border-teal-100 bg-teal-50/60 hover:bg-teal-50 transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-5 h-5 text-teal-600" />
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900">
                      {isTelugu ? 'నేల ఆరోగ్య నిర్ధారణ' : (isHindi ? 'मृदा स्वास्थ्य जांच' : 'Soil Health & Amendments')}
                    </h4>
                    <p className="text-[11px] text-neutral-500">
                      {isTelugu ? 'సున్నం, జిప్సం మరియు సేంద్రియ ఎరువుల సలహా' : (isHindi ? 'चूना, जिप्सम व जैविक खाद' : 'Lime, Gypsum, & Organic matter')}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            </div>
          </div>

          <div className="p-3 bg-neutral-50 rounded-lg text-xs text-neutral-600 border border-neutral-100">
            <span className="font-bold text-neutral-800 block mb-1">
              {isTelugu ? 'రైతుకు రోజువారీ చిట్కా:' : (isHindi ? 'आज का किसान सुझाव:' : 'Kisan Tip of the Day:')}
            </span>
            {isTelugu
              ? 'భారీ వర్షాలు కురిసే సమయంలో యూరియా వంటి నత్రజని ఎరువులు వేయకండి; వర్షపు నీటితో కొట్టుకుపోకుండా వర్షం తగ్గాక తడి ఆరిన తర్వాత వేయండి.'
              : (isHindi
              ? 'भारी वर्षा से ठीक पहले यूरिया खाद न डालें; वर्षा थमने और जल निकासी के बाद ही छिड़काव करें ताकि पोषक तत्व बह न जाएं।'
              : 'Avoid applying nitrogenous fertilizers like Urea immediately before heavy rains to prevent leaching and runoff.')}
          </div>
        </div>
      </div>
    </div>
  );
};
