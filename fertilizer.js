export function getFertilizerRecommendation(
  nitrogen,
  phosphorus,
  potassium,
  crop = null
) {
  const recommendations = [];
  const cropName = crop ? crop : "your crop";

  // NITROGEN
  if (nitrogen < 40) {
    recommendations.append
      ? recommendations.push({
          nutrient: "Nitrogen (N)",
          status: "Deficient",
          fertilizer: "Urea Fertilizer",
          reason: `${cropName} may need additional nitrogen.`,
          benefit: "Promotes healthy leaf and stem growth.",
          action: "Nitrogen fertilizer is recommended."
        })
      : recommendations.push({
          nutrient: "Nitrogen (N)",
          status: "Deficient",
          fertilizer: "Urea Fertilizer",
          reason: `${cropName} may need additional nitrogen.`,
          benefit: "Promotes healthy leaf and stem growth.",
          action: "Nitrogen fertilizer is recommended."
        });
  } else if (nitrogen > 80) {
    recommendations.push({
      nutrient: "Nitrogen (N)",
      status: "Excess",
      fertilizer: "No nitrogen fertilizer required",
      reason: "Nitrogen level is already high.",
      benefit: "Helps prevent excessive vegetative growth.",
      action: "Avoid additional nitrogen."
    });
  } else {
    recommendations.push({
      nutrient: "Nitrogen (N)",
      status: "Optimal",
      fertilizer: "No additional nitrogen fertilizer required",
      reason: "Nitrogen level is suitable.",
      benefit: "Maintains balanced plant growth.",
      action: "Maintain the current nutrient level."
    });
  }

  // PHOSPHORUS
  if (phosphorus < 40) {
    recommendations.push({
      nutrient: "Phosphorus (P)",
      status: "Deficient",
      fertilizer: "Diammonium Phosphate / Single Super Phosphate",
      reason: `${cropName} may need additional phosphorus.`,
      benefit: "Supports root development, flowering and fruit formation.",
      action: "Phosphorus fertilizer is recommended."
    });
  } else if (phosphorus > 80) {
    recommendations.push({
      nutrient: "Phosphorus (P)",
      status: "Excess",
      fertilizer: "No phosphorus fertilizer required",
      reason: "Phosphorus level is already high.",
      benefit: "Helps prevent unnecessary nutrient buildup.",
      action: "Avoid additional phosphorus."
    });
  } else {
    recommendations.push({
      nutrient: "Phosphorus (P)",
      status: "Optimal",
      fertilizer: "No additional phosphorus fertilizer required",
      reason: "Phosphorus level is suitable.",
      benefit: "Supports healthy root development.",
      action: "Maintain the current nutrient level."
    });
  }

  // POTASSIUM
  if (potassium < 40) {
    recommendations.push({
      nutrient: "Potassium (K)",
      status: "Deficient",
      fertilizer: "Muriate of Potash",
      reason: `${cropName} may need additional potassium.`,
      benefit: "Improves plant strength and stress tolerance.",
      action: "Potassium fertilizer is recommended."
    });
  } else if (potassium > 80) {
    recommendations.push({
      nutrient: "Potassium (K)",
      status: "Excess",
      fertilizer: "No potassium fertilizer required",
      reason: "Potassium level is already high.",
      benefit: "Helps maintain nutrient balance.",
      action: "Avoid additional potassium."
    });
  } else {
    recommendations.push({
      nutrient: "Potassium (K)",
      status: "Optimal",
      fertilizer: "No additional potassium fertilizer required",
      reason: "Potassium level is suitable.",
      benefit: "Supports overall plant health.",
      action: "Maintain the current nutrient level."
    });
  }

  return recommendations;
}
