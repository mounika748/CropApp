import React, { useState } from 'react';
import {
  Sprout,
  Mic,
  Globe,
  Menu,
  X,
  BarChart3,
  CloudRain,
  FlaskConical,
  MapPin,
  Sparkles,
  BookOpen,
  Layers,
  History,
  Share2,
  Check
} from 'lucide-react';
import { LanguageCode } from '../types';
import { LANGUAGES, getTranslation } from '../data/translations';
import { copyShareableLink, getPathForTab } from '../utils/routing';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const t = getTranslation(language);

  const navItems = [
    { id: 'dashboard', label: t.navDashboard, icon: BarChart3 },
    { id: 'soil', label: t.navSoilRec, icon: FlaskConical },
    { id: 'region', label: t.navRegionRec, icon: MapPin },
    { id: 'fertilizer', label: t.navFertilizer, icon: Sparkles },
    { id: 'soil-health', label: t.navSoilHealth, icon: Layers },
    { id: 'weather', label: t.navWeather, icon: CloudRain },
    { id: 'crops', label: t.navCrops, icon: BookOpen },
    { id: 'compare', label: t.navCompare, icon: Layers },
    { id: 'history', label: t.navHistory, icon: History }
  ];

  const handleShare = async () => {
    // If native share is available and not desktop fallback
    const path = getPathForTab(currentTab);
    const url = `${window.location.origin}${path}`;

    if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: 'CropApp – AI Crop & Fertilizer Advisory',
          text: 'Check out CropApp for precision crop recommendations and soil health analysis.',
          url
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    const res = await copyShareableLink(currentTab);
    if (res.success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-emerald-900 text-white border-b border-emerald-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Wordmark */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentTab('home')}
            title="CropApp Home"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-700 flex items-center justify-center text-emerald-100 shadow-inner group-hover:bg-emerald-600 transition-colors">
              <Sprout className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-serif">CROPAPP</span>
              </div>
              <p className="text-[11px] text-emerald-300 font-medium hidden sm:block">
                Crop & Fertilizer Guidance
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.slice(0, 7).map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-sm ring-1 ring-emerald-600'
                      : 'text-emerald-100 hover:bg-emerald-800/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions: Share, Voice & Language & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Share Page Button with direct copied feedback */}
            <div className="relative">
              <button
                onClick={handleShare}
                title="Share this page URL"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-emerald-200 hover:text-white border border-emerald-700 text-xs font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                {copiedLink ? (
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                ) : (
                  <Share2 className="w-3.5 h-3.5 text-emerald-300" />
                )}
                <span className="hidden sm:inline">
                  {copiedLink ? 'Copied!' : 'Share Page'}
                </span>
              </button>
              {copiedLink && (
                <div className="absolute right-0 top-full mt-2 px-3 py-1.5 rounded bg-neutral-900 text-emerald-300 text-xs shadow-lg whitespace-nowrap z-50 animate-fade-in border border-emerald-600">
                  ✓ Shareable URL copied to clipboard!
                </div>
              )}
            </div>

            {/* Language Selector Dropdown with 22 languages */}
            <div className="relative flex items-center">
              <Globe className="w-4 h-4 text-emerald-300 absolute left-2.5 pointer-events-none" />
              <select
                value={language}
                onChange={e => setLanguage(e.target.value as LanguageCode)}
                aria-label="Select Language"
                className="pl-8 pr-7 py-1.5 text-xs font-semibold rounded-lg bg-emerald-800 border border-emerald-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 appearance-none cursor-pointer hover:bg-emerald-750 transition-colors"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code} className="bg-neutral-900 text-white">
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2 text-emerald-300 text-[10px]">▼</div>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-emerald-950 border-t border-emerald-800 px-4 pt-3 pb-5 space-y-1">
          <button
            onClick={() => {
              setCurrentTab('home');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold ${
              currentTab === 'home' ? 'bg-emerald-800 text-white' : 'text-emerald-200 hover:bg-emerald-900'
            }`}
          >
            <Sprout className="w-5 h-5 text-emerald-400" />
            <span>{t.navHome}</span>
          </button>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold ${
                  isActive ? 'bg-emerald-800 text-white' : 'text-emerald-200 hover:bg-emerald-900'
                }`}
              >
                <Icon className="w-5 h-5 text-emerald-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
