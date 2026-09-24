export type AppTab =
  | 'home'
  | 'dashboard'
  | 'soil'
  | 'region'
  | 'fertilizer'
  | 'soil-health'
  | 'weather'
  | 'crops'
  | 'compare'
  | 'history';

export interface RouteDefinition {
  tab: AppTab;
  path: string;
  title: string;
  description: string;
}

export const ROUTES: Record<AppTab, RouteDefinition> = {
  home: {
    tab: 'home',
    path: '/',
    title: 'CropApp – AI Crop & Fertilizer Recommendation System',
    description: 'AI-powered crop, fertilizer, soil-health and weather assistance for farmers.'
  },
  soil: {
    tab: 'soil',
    path: '/crop-recommendation',
    title: 'Crop Recommendation – CropApp',
    description: 'Precision crop recommendations based on soil NPK, pH, and environmental conditions.'
  },
  region: {
    tab: 'region',
    path: '/region-recommendation',
    title: 'Regional Crop Guidance – CropApp',
    description: 'District and state-level crop guidance tailored to regional soil and water availability.'
  },
  fertilizer: {
    tab: 'fertilizer',
    path: '/fertilizer',
    title: 'Fertilizer Advisory – CropApp',
    description: 'Balanced N-P-K fertilizer recommendations to restore soil nutrients.'
  },
  'soil-health': {
    tab: 'soil-health',
    path: '/soil-health',
    title: 'Soil Health Diagnostics – CropApp',
    description: 'Analyze soil health index, pH remediation, and vital nutrients.'
  },
  weather: {
    tab: 'weather',
    path: '/weather',
    title: 'Farm Weather Guidance – CropApp',
    description: 'Real-time hyper-local farm weather forecasts and spraying advisories.'
  },
  crops: {
    tab: 'crops',
    path: '/crops',
    title: 'Crop Directory – CropApp',
    description: 'Comprehensive directory of 26+ commercial and staple crops in India.'
  },
  compare: {
    tab: 'compare',
    path: '/compare',
    title: 'Crop Comparison Matrix – CropApp',
    description: 'Compare nutrient requirements, season, and yield profiles across crops.'
  },
  history: {
    tab: 'history',
    path: '/history',
    title: 'Recommendation History – CropApp',
    description: 'View and print saved farm recommendations and official advisory certificates.'
  },
  dashboard: {
    tab: 'dashboard',
    path: '/dashboard',
    title: 'Dashboard Overview – CropApp',
    description: 'Quick dashboard overview of agricultural tools and recent recommendations.'
  }
};

const PATH_TO_TAB: Record<string, AppTab> = {
  '/': 'home',
  '': 'home',
  '/home': 'home',
  '/crop-recommendation': 'soil',
  '/crop-recommendations': 'soil',
  '/soil': 'soil',
  '/soil-recommendation': 'soil',
  '/region-recommendation': 'region',
  '/region-recommendations': 'region',
  '/region': 'region',
  '/fertilizer': 'fertilizer',
  '/fertilizers': 'fertilizer',
  '/fertilizer-recommendation': 'fertilizer',
  '/soil-health': 'soil-health',
  '/soil-health-card': 'soil-health',
  '/weather': 'weather',
  '/weather-guidance': 'weather',
  '/crops': 'crops',
  '/crop-directory': 'crops',
  '/compare': 'compare',
  '/crop-comparison': 'compare',
  '/history': 'history',
  '/dashboard': 'dashboard'
};

/**
 * Resolves an AppTab from a URL pathname.
 */
export function getTabFromPath(pathname: string): AppTab {
  const normalized = pathname.trim().replace(/\/+$/, '') || '/';
  return PATH_TO_TAB[normalized] || 'home';
}

/**
 * Gets the standard URL path for an AppTab.
 */
export function getPathForTab(tab: string): string {
  const route = ROUTES[tab as AppTab];
  return route ? route.path : '/';
}

/**
 * Updates browser history and document title without a full page reload.
 */
export function navigateTo(tab: string, replace = false): void {
  const route = ROUTES[tab as AppTab] || ROUTES.home;
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const targetPath = route.path;

  if (currentPath !== targetPath) {
    if (replace) {
      window.history.replaceState({ tab: route.tab }, route.title, targetPath);
    } else {
      window.history.pushState({ tab: route.tab }, route.title, targetPath);
    }
  }

  document.title = route.title;
}

/**
 * Copies the current or given page's shareable link to clipboard.
 */
export async function copyShareableLink(tab?: string): Promise<{ success: boolean; url: string }> {
  const path = tab ? getPathForTab(tab) : window.location.pathname;
  const url = `${window.location.origin}${path}`;

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
      return { success: true, url };
    }
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return { success: true, url };
  } catch {
    return { success: false, url };
  }
}
