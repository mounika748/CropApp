export interface Crop {
  id: string;
  name: string;
  hindiName: string;
  scientificName: string;
  category: 'Cereals' | 'Pulses' | 'Commercial' | 'Fruits' | 'Vegetables' | 'Oilseeds';
  season: 'Kharif' | 'Rabi' | 'Zaid' | 'Annual/Perennial';
  minN: number;
  maxN: number;
  optimalN: number;
  minP: number;
  maxP: number;
  optimalP: number;
  minK: number;
  maxK: number;
  optimalK: number;
  minPh: number;
  maxPh: number;
  optimalPh: number;
  minTemp: number;
  maxTemp: number;
  optimalTemp: number;
  minHumidity: number;
  maxHumidity: number;
  optimalHumidity: number;
  minRainfall: number;
  maxRainfall: number;
  optimalRainfall: number;
  soilTypes: string[];
  waterRequirement: 'High' | 'Medium' | 'Low';
  durationDays: string;
  majorStates: string[];
  description: string;
  growingTips: string[];
  fertilizerNeeds: string;
}

export interface SoilInputs {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  temperature: number;
  humidity: number;
  rainfall: number;
}

export interface RegionInputs {
  state: string;
  district: string;
  soilType: string;
  waterAvailability: 'High' | 'Medium' | 'Low';
  previousCrop?: string;
  latitude?: number;
  longitude?: number;
}

export interface FertilizerItem {
  nutrient: string;
  status: string;
  fertilizer: string;
  reason: string;
  benefit: string;
  action: string;
}

export interface SoilHealthReport {
  score: number;
  overallScore: number;
  status: string;
  nitrogenStatus: string;
  phosphorusStatus: string;
  potassiumStatus: string;
  phStatus: string;
  advice: string[];
  amendments: string[];
}

export interface WeatherDayForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  rain: number;
  code: number;
}

export interface WeatherReport {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: string;
  description: string;
  forecast: WeatherDayForecast[];
  farmingAdvisories: string[];
  provider?: string;
}

export interface RecommendationResult {
  id: string;
  timestamp: string;
  mode: 'soil' | 'region';
  crop: Crop;
  suitabilityScore: number;
  matchPercentage: number;
  runnerUpCrops: Array<{
    crop: Crop;
    score: number;
    matchPercentage: number;
    reason: string;
  }>;
  soilValues: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    ph: number;
    isEstimated?: boolean;
  };
  weatherValues: {
    temperature: number;
    humidity: number;
    rainfall: number;
  };
  fertilizerOptions: FertilizerItem[];
  soilHealth: SoilHealthReport;
  farmerAdvice: string[];
  regionDetails?: {
    state: string;
    district: string;
    soilType: string;
    waterAvailability: string;
    previousCrop?: string;
    isEstimated: boolean;
  };
}

export type LanguageCode =
  | 'en'
  | 'hi'
  | 'te'
  | 'ta'
  | 'kn'
  | 'ml'
  | 'mr'
  | 'gu'
  | 'bn'
  | 'pa'
  | 'or'
  | 'as'
  | 'ur'
  | 'ne'
  | 'kok'
  | 'mni'
  | 'brx'
  | 'doi'
  | 'mai'
  | 'sat'
  | 'ks'
  | 'sa';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  speechCode: string;
}
