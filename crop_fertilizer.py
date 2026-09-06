CROP_FERTILIZER = {
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
}


def get_crop_fertilizer(crop):
    crop = str(crop).lower().strip()

    return CROP_FERTILIZER.get(
        crop,
        {
            "nitrogen": "Urea Fertilizer",
            "phosphorus": "Diammonium Phosphate",
            "potassium": "Muriate of Potash"
        }
    )