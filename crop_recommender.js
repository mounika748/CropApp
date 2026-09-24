import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load crops from data/crops.csv
export function loadCrops() {
  const filePath = path.join(__dirname, 'data', 'crops.csv');
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());

  const crops = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = line.split(',');
    crops.push({
      crop: parts[0].trim(),
      nitrogen: parseFloat(parts[1]),
      phosphorus: parseFloat(parts[2]),
      potassium: parseFloat(parts[3]),
      temperature: parseFloat(parts[4]),
      humidity: parseFloat(parts[5]),
      rainfall: parseFloat(parts[6]),
      ph: parseFloat(parts[7])
    });
  }
  return crops;
}

// Recommend crop given soil and weather parameters
export function recommendCrop(params) {
  const crops = loadCrops();
  const n = Number(params.nitrogen) || 50;
  const p = Number(params.phosphorus) || 50;
  const k = Number(params.potassium) || 50;
  const temp = Number(params.temperature) || 25;
  const hum = Number(params.humidity) || 65;
  const rain = Number(params.rainfall) || 100;
  const ph = Number(params.ph) || 6.5;

  let bestCrop = crops[0];
  let minDistance = Infinity;

  // Normalized Euclidean distance
  for (const c of crops) {
    const dN = (n - c.nitrogen) / 100;
    const dP = (p - c.phosphorus) / 100;
    const dK = (k - c.potassium) / 100;
    const dTemp = (temp - c.temperature) / 30;
    const dHum = (hum - c.humidity) / 50;
    const dRain = (rain - c.rainfall) / 150;
    const dPh = (ph - c.ph) / 4;

    const dist = (
      dN * dN * 1.5 +
      dP * dP * 1.5 +
      dK * dK * 1.5 +
      dTemp * dTemp +
      dHum * dHum +
      dRain * dRain * 1.2 +
      dPh * dPh
    );

    if (dist < minDistance) {
      minDistance = dist;
      bestCrop = c;
    }
  }

  // Format crop name with capitalized first letter
  const rawName = bestCrop.crop;
  return rawName.charAt(0).toUpperCase() + rawName.slice(1);
}

// Recommend crop by region and farm details
export function recommendCropForRegion({ state, district, soil_type, water, previous_crop }) {
  // Estimate soil profile based on soil type
  const soilMap = {
    'Sandy': { n: 30, p: 25, k: 25, ph: 6.5 },
    'Clay': { n: 60, p: 45, k: 45, ph: 6.0 },
    'Loamy': { n: 55, p: 45, k: 45, ph: 6.5 },
    'Black Soil': { n: 70, p: 40, k: 60, ph: 7.5 },
    'Red Soil': { n: 40, p: 30, k: 40, ph: 6.2 },
    'Alluvial': { n: 80, p: 50, k: 50, ph: 6.8 },
    'Laterite': { n: 35, p: 25, k: 30, ph: 5.5 }
  };

  const soilProfile = soilMap[soil_type] || { n: 50, p: 40, k: 40, ph: 6.5 };

  // Water availability estimates
  let rainfall = 90;
  let humidity = 60;
  if (water === 'High') {
    rainfall = 190;
    humidity = 78;
  } else if (water === 'Low') {
    rainfall = 55;
    humidity = 48;
  }

  const temperature = 26.0;

  // Find candidate crops
  const crops = loadCrops();
  const prevLower = String(previous_crop || '').toLowerCase().trim();

  let candidates = crops;
  if (prevLower) {
    const filtered = crops.filter(c => c.crop.toLowerCase() !== prevLower);
    if (filtered.length > 0) candidates = filtered;
  }

  let bestCrop = candidates[0];
  let minDistance = Infinity;

  for (const c of candidates) {
    const dN = (soilProfile.n - c.nitrogen) / 100;
    const dP = (soilProfile.p - c.phosphorus) / 100;
    const dK = (soilProfile.k - c.potassium) / 100;
    const dTemp = (temperature - c.temperature) / 30;
    const dHum = (humidity - c.humidity) / 50;
    const dRain = (rainfall - c.rainfall) / 150;
    const dPh = (soilProfile.ph - c.ph) / 4;

    const dist = (
      dN * dN +
      dP * dP +
      dK * dK +
      dTemp * dTemp +
      dHum * dHum +
      dRain * dRain * 1.5 +
      dPh * dPh
    );

    if (dist < minDistance) {
      minDistance = dist;
      bestCrop = c;
    }
  }

  const cropName = bestCrop.crop.charAt(0).toUpperCase() + bestCrop.crop.slice(1);
  return {
    crop: cropName,
    estimatedSoil: soilProfile,
    rainfall,
    humidity,
    temperature
  };
}
