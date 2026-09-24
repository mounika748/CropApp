import React, { useState } from 'react';
import { Search, BookOpen, ArrowRight } from 'lucide-react';
import { Crop, LanguageCode } from '../types';
import { CROPS_DATA } from '../data/crops';
import { getLocalizedCrop } from '../utils/cropLocalization';

interface CropDirectoryProps {
  language: LanguageCode;
  onSelectForComparison?: (crop: Crop) => void;
}

export const CropDirectory: React.FC<CropDirectoryProps> = ({ language, onSelectForComparison }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [activeCrop, setActiveCrop] = useState<Crop | null>(null);

  const labels = language === 'te' ? {
    tagline: 'సమగ్ర వ్యవసాయ పంటల నిధి',
    title: 'పంటల ప్రొఫైల్స్ & డైరెక్టరీ',
    desc: 'భారతదేశంలోని ప్రధాన పంటల పెరుగుదల పరిస్థితులు, పోషకాల అవసరాలు మరియు రాష్ట్రాల వారీ వివరాలు తెలుసుకోండి.',
    searchPlaceholder: 'పంట పేరు లేదా రాష్ట్రం ద్వారా శోధించండి...',
    category: 'వర్గం',
    season: 'కాలం',
    all: 'అన్నీ',
    cereals: 'ధాన్యాలు',
    pulses: 'పప్పుధాన్యాలు',
    commercial: 'వాణిజ్య పంటలు',
    fruits: 'పండ్లు',
    vegetables: 'కూరగాయలు',
    oilseeds: 'నూనె గింజలు',
    kharif: 'ఖరీఫ్',
    rabi: 'రబీ',
    zaid: 'వేసవి',
    annual: 'వార్షిక',
    waterNeed: 'నీటి అవసరం',
    optimalPh: 'అనుకూల పిహెచ్',
    duration: 'పంట కాలం',
    viewDetails: 'పూర్తి వివరాలు చూడండి',
    compare: '+ సరిపోల్చండి',
    noResults: 'మీ ఎంపికకు తగిన పంటలు కనిపించలేదు.',
    resetFilters: 'ఫిల్టర్లు రీసెట్ చేయండి',
    npkOptimal: 'సరైన N-P-K నిష్పత్తి',
    temperature: 'ఉష్ణోగ్రత',
    rainfall: 'వర్షపాతం',
    soilTypes: 'అనుకూలమైన నేలలు',
    states: 'ప్రధానంగా సాగుచేసే రాష్ట్రాలు',
    fertilizerDynamics: 'పోషకాల నిర్వహణ',
    cultivationTips: 'సాగు పద్ధతులు మరియు సూచనలు',
    closeProfile: 'ప్రొఫైల్ మూసివేయండి'
  } : language === 'hi' ? {
    tagline: 'व्यापक कृषि फसल निर्देशिका',
    title: 'फसल प्रोफाइल एवं निर्देशिका',
    desc: 'भारत की प्रमुख फसलों की वैज्ञानिक कृषि दशाएं, पोषक तत्व मांग व राज्यवार वितरण की संपूर्ण जानकारी।',
    searchPlaceholder: 'फसल का नाम अथवा राज्य लिखकर खोजें...',
    category: 'श्रेणी',
    season: 'मौसम',
    all: 'सभी',
    cereals: 'अनाज',
    pulses: 'दलहन',
    commercial: 'व्यावसायिक',
    fruits: 'फल',
    vegetables: 'सब्जियां',
    oilseeds: 'तिलहन',
    kharif: 'खरीफ',
    rabi: 'रबी',
    zaid: 'जायद',
    annual: 'वार्षिक',
    waterNeed: 'जल आवश्यकता',
    optimalPh: 'उचित पीएच',
    duration: 'फसल अवधि',
    viewDetails: 'विस्तृत विवरण देखें',
    compare: '+ तुलना करें',
    noResults: 'आपके खोज अनुसार कोई फसल नहीं मिली।',
    resetFilters: 'फ़िल्टर रीसेट करें',
    npkOptimal: 'आदर्श N-P-K अनुपात',
    temperature: 'तापमान',
    rainfall: 'वर्षा',
    soilTypes: 'उपयुक्त मिट्टी के प्रकार',
    states: 'प्रमुख उत्पादक राज्य',
    fertilizerDynamics: 'पोषक तत्व प्रबंधन',
    cultivationTips: 'उन्नत कृषि तकनीक एवं सुझाव',
    closeProfile: 'प्रोफाइल बंद करें'
  } : {
    tagline: 'Comprehensive Agronomic Repository',
    title: 'Crop Profiles & Directory',
    desc: 'Explore scientific growing conditions, nutrient demands, water profiles, and state distributions for prominent Indian crops.',
    searchPlaceholder: 'Search by crop name or state...',
    category: 'Category',
    season: 'Season',
    all: 'All',
    cereals: 'Cereals',
    pulses: 'Pulses',
    commercial: 'Commercial',
    fruits: 'Fruits',
    vegetables: 'Vegetables',
    oilseeds: 'Oilseeds',
    kharif: 'Kharif',
    rabi: 'Rabi',
    zaid: 'Zaid',
    annual: 'Annual',
    waterNeed: 'Water Need',
    optimalPh: 'Optimal pH',
    duration: 'Duration',
    viewDetails: 'View Full Agronomy',
    compare: '+ Compare',
    noResults: 'No crops matched your filter criteria.',
    resetFilters: 'Reset Filters',
    npkOptimal: 'Optimal N-P-K',
    temperature: 'Temperature',
    rainfall: 'Rainfall',
    soilTypes: 'Suitable Soil Types',
    states: 'Major Producing States',
    fertilizerDynamics: 'Nutrient Dynamics',
    cultivationTips: 'Agronomic Cultivation Tips',
    closeProfile: 'Close Profile'
  };

  const categories = [
    { key: 'All', label: labels.all },
    { key: 'Cereals', label: labels.cereals },
    { key: 'Pulses', label: labels.pulses },
    { key: 'Commercial', label: labels.commercial },
    { key: 'Fruits', label: labels.fruits },
    { key: 'Vegetables', label: labels.vegetables },
    { key: 'Oilseeds', label: labels.oilseeds }
  ];

  const seasons = [
    { key: 'All', label: labels.all },
    { key: 'Kharif', label: labels.kharif },
    { key: 'Rabi', label: labels.rabi },
    { key: 'Zaid', label: labels.zaid },
    { key: 'Annual/Perennial', label: labels.annual }
  ];

  const filteredCrops = CROPS_DATA.filter(crop => {
    const loc = getLocalizedCrop(crop.id, language);
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      loc.name.toLowerCase().includes(searchLower) ||
      crop.name.toLowerCase().includes(searchLower) ||
      crop.scientificName.toLowerCase().includes(searchLower) ||
      crop.majorStates.some(s => s.toLowerCase().includes(searchLower));

    const matchesCat = selectedCategory === 'All' || crop.category === selectedCategory;
    const matchesSeason = selectedSeason === 'All' || crop.season === selectedSeason;

    return matchesSearch && matchesCat && matchesSeason;
  });

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-xl bg-neutral-900 text-white border border-neutral-800 shadow-md">
        <div className="absolute inset-0 opacity-25">
          <img
            src="/src/assets/images/crop_harvest_produce_1790228763620.jpg"
            alt="Indian crop harvest"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-8 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-lime-600/90 text-white mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{labels.tagline}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">
            {labels.title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1">
            {labels.desc}
          </p>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-neutral-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Filter Selects */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <span className="font-bold text-neutral-500 text-[11px] uppercase mr-1">{labels.category}:</span>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-neutral-300 font-semibold focus:outline-none bg-white"
            >
              {categories.map(c => (
                <option key={c.key} value={c.key}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span className="font-bold text-neutral-500 text-[11px] uppercase mr-1">{labels.season}:</span>
            <select
              value={selectedSeason}
              onChange={e => setSelectedSeason(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-neutral-300 font-semibold focus:outline-none bg-white"
            >
              {seasons.map(s => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Crop Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCrops.map(crop => {
          const loc = getLocalizedCrop(crop.id, language);

          return (
            <div
              key={crop.id}
              className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-black text-neutral-900 font-serif">
                      {loc.name}
                    </h3>
                    <p className="text-[11px] italic text-neutral-500 mt-0.5">
                      {crop.scientificName}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                    {loc.category}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 mt-3 line-clamp-2 leading-relaxed">
                  {loc.description}
                </p>

                {/* Quick Specs */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-neutral-700 bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                  <div>
                    <span className="text-[10px] text-neutral-500 font-semibold block">{labels.season}</span>
                    <span className="font-bold text-neutral-900">{loc.season}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 font-semibold block">{labels.waterNeed}</span>
                    <span className="font-bold text-neutral-900">{loc.waterRequirement}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 font-semibold block">{labels.optimalPh}</span>
                    <span className="font-bold text-neutral-900 tabular-nums">{crop.optimalPh} ({crop.minPh}-{crop.maxPh})</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 font-semibold block">{labels.duration}</span>
                    <span className="font-bold text-neutral-900">{crop.durationDays}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveCrop(crop)}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <span>{labels.viewDetails}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {onSelectForComparison && (
                  <button
                    onClick={() => onSelectForComparison(crop)}
                    className="px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[11px] font-semibold transition-colors"
                  >
                    {labels.compare}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredCrops.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-neutral-200 p-6">
          <p className="text-sm font-semibold text-neutral-600">{labels.noResults}</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedSeason('All');
            }}
            className="mt-3 px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold"
          >
            {labels.resetFilters}
          </button>
        </div>
      )}

      {/* Full Agronomy Detail Modal */}
      {activeCrop && (() => {
        const activeLoc = getLocalizedCrop(activeCrop.id, language);

        return (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-neutral-200">
              <div className="flex items-start justify-between pb-4 border-b border-neutral-200">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {activeLoc.category} • {activeLoc.season}
                  </span>
                  <h3 className="text-2xl font-black text-neutral-900 font-serif mt-1">
                    {activeLoc.name}
                  </h3>
                  <p className="text-xs italic text-neutral-500">
                    {activeCrop.scientificName}
                  </p>
                </div>

                <button
                  onClick={() => setActiveCrop(null)}
                  className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <p className="text-xs text-neutral-700 leading-relaxed">
                  {activeLoc.description}
                </p>

                {/* Requirement Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                    <span className="text-[10px] text-neutral-500 uppercase font-bold block">{labels.npkOptimal}</span>
                    <span className="text-xs font-black text-neutral-900 mt-0.5 block tabular-nums">
                      {activeCrop.optimalN} : {activeCrop.optimalP} : {activeCrop.optimalK}
                    </span>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                    <span className="text-[10px] text-neutral-500 uppercase font-bold block">{labels.optimalPh}</span>
                    <span className="text-xs font-black text-neutral-900 mt-0.5 block tabular-nums">
                      {activeCrop.minPh} - {activeCrop.maxPh}
                    </span>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                    <span className="text-[10px] text-neutral-500 uppercase font-bold block">{labels.temperature}</span>
                    <span className="text-xs font-black text-neutral-900 mt-0.5 block tabular-nums">
                      {activeCrop.minTemp}°C - {activeCrop.maxTemp}°C
                    </span>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                    <span className="text-[10px] text-neutral-500 uppercase font-bold block">{labels.rainfall}</span>
                    <span className="text-xs font-black text-neutral-900 mt-0.5 block tabular-nums">
                      {activeCrop.minRainfall} - {activeCrop.maxRainfall} mm
                    </span>
                  </div>
                </div>

                {/* Soil & States */}
                <div className="space-y-2 text-xs text-neutral-700">
                  <div>
                    <strong className="text-neutral-900">{labels.soilTypes}: </strong>
                    <span>{activeCrop.soilTypes.join(', ')}</span>
                  </div>
                  <div>
                    <strong className="text-neutral-900">{labels.states}: </strong>
                    <span>{activeCrop.majorStates.join(', ')}</span>
                  </div>
                  <div>
                    <strong className="text-neutral-900">{labels.fertilizerDynamics}: </strong>
                    <span>{activeCrop.fertilizerNeeds}</span>
                  </div>
                </div>

                {/* Cultivation Tips */}
                <div className="pt-2 border-t border-neutral-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2">
                    {labels.cultivationTips}:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    {activeCrop.growingTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold shrink-0">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200 flex justify-end">
                <button
                  onClick={() => setActiveCrop(null)}
                  className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                >
                  {labels.closeProfile}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
