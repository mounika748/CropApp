import React from 'react';
import { FlaskConical, MapPin, Sparkles, Layers, CloudRain, BookOpen, History, ArrowRight, ShieldCheck, Volume2, CheckCircle2 } from 'lucide-react';
import { LanguageCode } from '../types';
import { getTranslation } from '../data/translations';

interface HeroProps {
  onNavigate: (tab: string) => void;
  language: LanguageCode;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, language }) => {
  const t = getTranslation(language);

  const isTelugu = language === 'te';
  const isHindi = language === 'hi';

  const quickCards = [
    {
      id: 'soil',
      title: isTelugu ? 'మట్టి పరీక్ష విలువలతో సిఫార్సు' : (isHindi ? 'मृदा परीक्षण मानों से अनुशंसा' : 'I Know My Soil Values'),
      subtitle: isTelugu
        ? 'నత్రజని, భాస్వరం, పొటాషియం మరియు పిహెచ్ విలువలను నమోదు చేసి శాస్త్రీయ పంట సిఫార్సు పొందండి'
        : (isHindi ? 'नाइट्रोजन, फास्फोरस, पोटाश व पीएच मान दर्ज कर सटीक फसल अनुशंसा प्राप्त करें' : 'Enter laboratory N, P, K & pH test values for scientific crop matching'),
      icon: FlaskConical,
      color: 'border-emerald-600/30 hover:border-emerald-500 bg-white'
    },
    {
      id: 'region',
      title: isTelugu ? 'ప్రాంతీయ విధానం' : (isHindi ? 'क्षेत्रीय प्रणाली' : "Recommend by Region"),
      subtitle: isTelugu
        ? 'మీ రాష్ట్రం, జిల్లా మరియు నేల రకాన్ని గుర్తించి ప్రాంతీయ ప్రామాణిక సిఫార్సు పొందండి'
        : (isHindi ? 'अपना राज्य, जिला व मिट्टी का प्रकार चुनकर क्षेत्रीय फसल सुझाव प्राप्त करें' : 'Select your State, District & soil type with regional benchmark estimations'),
      icon: MapPin,
      color: 'border-amber-600/30 hover:border-amber-500 bg-white'
    },
    {
      id: 'fertilizer',
      title: isTelugu ? 'ఎరువుల సలహా' : (isHindi ? 'उर्वरक सलाह' : 'Fertilizer Recommendation'),
      subtitle: isTelugu
        ? 'యూరియా, డిఎపి మరియు పొటాష్ ఎంత వేయాలో ఖచ్చితమైన మార్గదర్శకత్వం'
        : (isHindi ? 'यूरिया, डीएपी व पोटाश खाद की सही मात्रा और प्रयोग का मार्गदर्शन' : 'Get actionable Urea, DAP/SSP & Potash guidelines without chemical overdose'),
      icon: Sparkles,
      color: 'border-blue-600/30 hover:border-blue-500 bg-white'
    },
    {
      id: 'soil-health',
      title: isTelugu ? 'నేల ఆరోగ్యం' : (isHindi ? 'मृदा स्वास्थ्य' : 'Soil Health Assessment'),
      subtitle: isTelugu
        ? 'నేల ఆమ్ల, క్షార గుణాలు మరియు పోషకాల సమతుల్యతను అంచనా వేసి సవరణలు తెలుసుకోండి'
        : (isHindi ? 'मिट्टी की अम्लीयता, क्षारीयता और पोषक तत्व संतुलन की जांच' : 'Gauge soil acidity, alkalinity & nutrient balance with remediation steps'),
      icon: Layers,
      color: 'border-teal-600/30 hover:border-teal-500 bg-white'
    },
    {
      id: 'weather',
      title: isTelugu ? 'ఖచ్చితమైన వాతావరణం' : (isHindi ? 'सटीक खेत मौसम' : 'Farm Weather & Advisory'),
      subtitle: isTelugu
        ? 'మీ పరికరం జిపిఎస్ ఆధారంగా ప్రత్యక్ష వాతావరణం, వర్ష సూచన మరియు పిచికారీ సలహాలు'
        : (isHindi ? 'डिवाइस जीपीएस पर आधारित लाइव मौसम, वर्षा और छिड़काव परामर्श' : 'Live farm forecast with spray windows and irrigation timing warnings'),
      icon: CloudRain,
      color: 'border-sky-600/30 hover:border-sky-500 bg-white'
    },
    {
      id: 'crops',
      title: isTelugu ? 'పంటల జాబితా' : (isHindi ? 'फसल निर्देशिका' : 'Crop Directory'),
      subtitle: isTelugu
        ? 'వివిధ పంటల సాగు కాలం, నీటి అవసరాలు మరియు అధిక దిగుబడి సూచనలు'
        : (isHindi ? 'फसलों के बोने का समय, जल आवश्यकता और उन्नत खेती के तरीके' : 'Explore sowing periods, water needs, ideal climate & high-yield practices'),
      icon: BookOpen,
      color: 'border-lime-600/30 hover:border-lime-500 bg-white'
    },
    {
      id: 'history',
      title: isTelugu ? 'సిఫార్సుల చరిత్ర' : (isHindi ? 'अनुशंसा इतिहास' : 'Recommendation History'),
      subtitle: isTelugu
        ? 'గతంలో పొందిన సిఫార్సుల నివేదికలను చూడండి మరియు ప్రింట్ తీసుకోండి'
        : (isHindi ? 'पूर्व में प्राप्त फसल और उर्वरक रिपोर्ट देखें और प्रिंट करें' : 'Review, compare and print previous farm recommendation reports'),
      icon: History,
      color: 'border-purple-600/30 hover:border-purple-500 bg-white'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900 text-white shadow-xl border border-neutral-800">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="/src/assets/images/cropapp_hero_field_1790228734257.jpg"
            alt="Indian farm fields"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
        </div>

        <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600/90 text-white mb-4 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isTelugu ? 'భారతీయ రైతుల కోసం వ్యవసాయ సలహా వేదిక' : (isHindi ? 'भारतीय किसानों के लिए समर्पित कृषि मंच' : 'Dedicated Agriculture Platform for Indian Farmers')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-serif leading-tight">
            {t.appTitle}
          </h1>

          <p className="mt-3 text-lg sm:text-xl font-medium text-emerald-100">
            {t.appSubtitle}
          </p>

          <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
            {isTelugu
              ? 'శాస్త్రీయ పంట ఎంపిక, సమతుల్య ఎరువుల మోతాదులు, ప్రత్యక్ష వాతావరణ సమాచారం మరియు రైతులకు సులభంగా అర్థమయ్యే ఆడియో సౌలభ్యం.'
              : (isHindi
              ? 'वैज्ञानिक फसल चयन, संतुलित उर्वरक मात्रा, सटीक लाइव मौसम और किसानों के लिए सरल ऑडियो सुविधा।'
              : 'Empowering farmers across India with scientific crop selection, customized NPK fertilizer calculations, live micro-weather farming advisories, and pure audio assistance.')}
          </p>

          {/* Quick CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('soil')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-all focus:ring-2 focus:ring-emerald-400"
            >
              <FlaskConical className="w-4 h-4" />
              <span>{isTelugu ? 'మట్టి పరీక్ష విలువలు నమోదు చేయండి' : (isHindi ? 'मृदा परीक्षण मान दर्ज करें' : 'Enter Soil Test Values')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('region')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-sm border border-neutral-700 shadow transition-all focus:ring-2 focus:ring-neutral-400"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{isTelugu ? 'ప్రాంతం ద్వారా సిఫార్సు' : (isHindi ? 'क्षेत्र द्वारा अनुशंसा' : 'Recommend by Region')}</span>
            </button>

            <button
              onClick={() => onNavigate('weather')}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-emerald-200 font-semibold text-sm border border-emerald-900/60 shadow transition-all"
            >
              <CloudRain className="w-4 h-4 text-sky-400" />
              <span>{t.navWeather}</span>
            </button>
          </div>

          {/* Feature Badges */}
          <div className="mt-8 pt-6 border-t border-neutral-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{isTelugu ? 'ఖచ్చితమైన ప్రయోగశాల విలువలు' : (isHindi ? 'सटीक प्रयोगशाला मान' : 'Precise Lab Test Inputs')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{isTelugu ? 'జిపిఎస్ ప్రత్యక్ష వాతావరణం' : (isHindi ? 'जीपीएस लाइव मौसम' : 'Live Device GPS Weather')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{isTelugu ? 'రైతుల కోసం ఆడియో సదుపాయం' : (isHindi ? 'किसानों के लिए ऑडियो सुविधा' : 'Audio Term Pronunciations')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Cards Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 font-serif">
              {isTelugu ? 'వ్యవసాయ మార్గదర్శక విభాగాలు' : (isHindi ? 'कृषि मार्गदर्शन मॉड्यूल' : 'Agricultural Guidance Modules')}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              {isTelugu ? 'మీ వ్యవసాయ సమాచారాన్ని విశ్లేషించడానికి క్రింది విభాగాన్ని ఎంచుకోండి' : (isHindi ? 'खेत का विश्लेषण और सलाह प्राप्त करने हेतु नीचे चयन करें' : 'Select a module below to analyze your farm parameters or check guidance')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickCards.map(card => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className={`group cursor-pointer rounded-xl p-5 border shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 ${card.color}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                      {card.subtitle}
                    </p>
                  </div>
                  <div className="text-neutral-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all pt-1">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
