export const CROP_FERTILIZER = {
  "rice": {
    "nitrogen": "Urea Fertilizer",
    "phosphorus": "Diammonium Phosphate",
    "potassium": "Muriate of Potash"
  },
  "wheat": {
    "nitrogen": "Urea Fertilizer",
    "phosphorus": "Diammonium Phosphate",
    "potassium": "Muriate of Potash"
  },
  "maize": {
    "nitrogen": "Urea Fertilizer",
    "phosphorus": "Diammonium Phosphate",
    "potassium": "Muriate of Potash"
  },
  "cotton": {
    "nitrogen": "Urea Fertilizer",
    "phosphorus": "Single Super Phosphate",
    "potassium": "Muriate of Potash"
  },
  "sugarcane": {
    "nitrogen": "Urea Fertilizer",
    "phosphorus": "Diammonium Phosphate",
    "potassium": "Muriate of Potash"
  },
  "tomato": {
    "nitrogen": "Urea Fertilizer",
    "phosphorus": "Diammonium Phosphate",
    "potassium": "Muriate of Potash"
  },
  "potato": {
    "nitrogen": "Urea Fertilizer",
    "phosphorus": "Single Super Phosphate",
    "potassium": "Muriate of Potash"
  },
  "groundnut": {
    "nitrogen": "Urea Fertilizer",
    "phosphorus": "Single Super Phosphate",
    "potassium": "Muriate of Potash"
  }
};

export function getCropFertilizer(crop) {
  const normalized = String(crop || "").toLowerCase().trim();
  return CROP_FERTILIZER[normalized] || {
    "nitrogen": "Urea Fertilizer",
    "phosphorus": "Diammonium Phosphate",
    "potassium": "Muriate of Potash"
  };
}
