import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Dashboard } from './components/Dashboard';
import { SoilRecommendation } from './components/SoilRecommendation';
import { RegionRecommendation } from './components/RegionRecommendation';
import { FertilizerAdvisor } from './components/FertilizerAdvisor';
import { SoilHealth } from './components/SoilHealth';
import { WeatherGuidance } from './components/WeatherGuidance';
import { CropDirectory } from './components/CropDirectory';
import { CropComparison } from './components/CropComparison';
import { HistoryView } from './components/HistoryView';
import { ReportModal } from './components/ReportModal';
import { Crop, LanguageCode, RecommendationResult } from './types';
import { getTranslation, LANGUAGES } from './data/translations';
import { Sprout, Phone, ShieldCheck, Share2, Check } from 'lucide-react';
import { getTabFromPath, navigateTo, copyShareableLink, ROUTES, AppTab } from './utils/routing';

export const App: React.FC = () => {
  // Initialize current tab from actual browser URL path
  const [currentTab, setCurrentTabState] = useState<AppTab>(() => {
    if (typeof window !== 'undefined') {
      return getTabFromPath(window.location.pathname);
    }
    return 'home';
  });

  const [language, setLanguage] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('cropapp_lang');
    return (saved as LanguageCode) || 'en';
  });

  const [recommendations, setRecommendations] = useState<RecommendationResult[]>(() => {
    try {
      const saved = localStorage.getItem('cropapp_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeReport, setActiveReport] = useState<RecommendationResult | null>(null);
  const [compareCrops, setCompareCrops] = useState<Crop[]>([]);
  const [sharedToast, setSharedToast] = useState<string | null>(null);

  const t = getTranslation(language);

  // Synchronize browser URL & history navigation
  const setCurrentTab = useCallback((tab: string, replace = false) => {
    const validTab = (tab in ROUTES ? tab : 'home') as AppTab;
    setCurrentTabState(validTab);
    navigateTo(validTab, replace);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen to browser Back/Forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const tab = getTabFromPath(window.location.pathname);
      setCurrentTabState(tab);
      const route = ROUTES[tab] || ROUTES.home;
      document.title = route.title;
    };

    window.addEventListener('popstate', handlePopState);

    // Ensure URL and Title are synchronized on first load
    const initialTab = getTabFromPath(window.location.pathname);
    navigateTo(initialTab, true);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Persist language
  useEffect(() => {
    localStorage.setItem('cropapp_lang', language);
  }, [language]);

  // Persist history
  useEffect(() => {
    localStorage.setItem('cropapp_history', JSON.stringify(recommendations));
  }, [recommendations]);

  const handleRecommendationGenerated = (rec: RecommendationResult) => {
    setRecommendations(prev => [rec, ...prev.slice(0, 19)]);
  };

  const handleClearHistory = () => {
    setRecommendations([]);
    localStorage.removeItem('cropapp_history');
  };

  const handleSelectForComparison = (crop: Crop) => {
    setCompareCrops(prev => {
      if (prev.some(c => c.id === crop.id)) return prev;
      return [...prev.slice(0, 2), crop];
    });
    setCurrentTab('compare');
  };

  const handleShareCurrentPage = async () => {
    const res = await copyShareableLink(currentTab);
    if (res.success) {
      setSharedToast(`Shareable link copied: ${res.url}`);
      setTimeout(() => setSharedToast(null), 3500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 text-neutral-900 font-sans antialiased selection:bg-emerald-200">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Share Toast Notification */}
      {sharedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-neutral-900 text-white rounded-xl shadow-2xl border border-emerald-500 text-xs font-medium animate-bounce">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate max-w-xs sm:max-w-md">{sharedToast}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'home' && (
          <Hero onNavigate={setCurrentTab} language={language} />
        )}

        {currentTab === 'dashboard' && (
          <Dashboard
            language={language}
            onNavigate={setCurrentTab}
            recentRecommendations={recommendations}
            onOpenReport={setActiveReport}
          />
        )}

        {currentTab === 'soil' && (
          <SoilRecommendation
            language={language}
            onRecommendationGenerated={handleRecommendationGenerated}
            onOpenReport={setActiveReport}
          />
        )}

        {currentTab === 'region' && (
          <RegionRecommendation
            language={language}
            onRecommendationGenerated={handleRecommendationGenerated}
            onOpenReport={setActiveReport}
          />
        )}

        {currentTab === 'fertilizer' && (
          <FertilizerAdvisor language={language} />
        )}

        {currentTab === 'soil-health' && (
          <SoilHealth language={language} />
        )}

        {currentTab === 'weather' && (
          <WeatherGuidance language={language} />
        )}

        {currentTab === 'crops' && (
          <CropDirectory
            language={language}
            onSelectForComparison={handleSelectForComparison}
          />
        )}

        {currentTab === 'compare' && (
          <CropComparison
            language={language}
            initialCrops={compareCrops}
          />
        )}

        {currentTab === 'history' && (
          <HistoryView
            language={language}
            recommendations={recommendations}
            onOpenReport={setActiveReport}
            onClearHistory={handleClearHistory}
            onNavigate={setCurrentTab}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800 mt-16 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
                  <Sprout className="w-5 h-5 text-emerald-300" />
                </div>
                <span className="text-lg font-black text-white font-serif tracking-tight">CROPAPP</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                National AI Crop & Fertilizer Recommendation Platform dedicated to Indian farmers across all 28 States & 8 Union Territories.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ICAR Aligned Science</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                Advisory Modules
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li>
                  <button onClick={() => setCurrentTab('soil')} className="hover:text-emerald-400 transition-colors">
                    Crop Recommendation (/crop-recommendation)
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentTab('region')} className="hover:text-emerald-400 transition-colors">
                    Regional Agro-Climatic Selection (/region-recommendation)
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentTab('fertilizer')} className="hover:text-emerald-400 transition-colors">
                    Fertilizer Dosage & NPK Guidance (/fertilizer)
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentTab('soil-health')} className="hover:text-emerald-400 transition-colors">
                    Soil Health & pH Diagnostics (/soil-health)
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentTab('weather')} className="hover:text-emerald-400 transition-colors">
                    Farm Weather & Spray Windows (/weather)
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentTab('crops')} className="hover:text-emerald-400 transition-colors">
                    Crop Directory (/crops)
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                Government Helplines
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Kisan Call Center: <strong>1800-180-1551</strong> (Toll Free)</span>
                </li>
                <li>
                  <span>Soil Health Card Scheme (DAC&FW)</span>
                </li>
                <li>
                  <span>PM Krishi Sinchayee Yojana (PMKSY)</span>
                </li>
                <li>
                  <span>PM Fasal Bima Yojana (PMFBY)</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                Indian Languages
              </h4>
              <p className="text-[11px] text-neutral-400 mb-2">
                Available in 22 constitutional languages with voice input and text-to-speech.
              </p>
              <div className="flex flex-wrap gap-1 text-[10px]">
                {LANGUAGES.slice(0, 12).map(l => (
                  <span
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className="px-1.5 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer transition-colors"
                  >
                    {l.nativeName}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-800">
                <button
                  onClick={handleShareCurrentPage}
                  className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Copy shareable page link</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
            <div>
              © {new Date().getFullYear()} CROPAPP – AI Crop & Fertilizer Recommendation System.
            </div>
            <div className="text-[11px] text-neutral-400 font-mono">
              Direct Application Route: {ROUTES[currentTab]?.path || '/'}
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {activeReport && (
        <ReportModal
          recommendation={activeReport}
          onClose={() => setActiveReport(null)}
          language={language}
        />
      )}
    </div>
  );
};

export default App;
