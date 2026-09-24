export function analyzeSoilHealth(nitrogen, phosphorus, potassium, ph) {
  const nutrients = {
    Nitrogen: nitrogen,
    Phosphorus: phosphorus,
    Potassium: potassium,
    pH: ph
  };

  let score = 100;
  const issues = [];

  if (nitrogen < 40) {
    score -= 15;
    issues.push("Nitrogen is low.");
  } else if (nitrogen > 80) {
    score -= 10;
    issues.push("Nitrogen is high.");
  }

  if (phosphorus < 40) {
    score -= 15;
    issues.push("Phosphorus is low.");
  } else if (phosphorus > 80) {
    score -= 10;
    issues.push("Phosphorus is high.");
  }

  if (potassium < 40) {
    score -= 15;
    issues.push("Potassium is low.");
  } else if (potassium > 80) {
    score -= 10;
    issues.push("Potassium is high.");
  }

  if (ph < 5.5) {
    score -= 15;
    issues.push("Soil is acidic.");
  } else if (ph > 8.0) {
    score -= 15;
    issues.push("Soil is alkaline.");
  }

  let health = "Poor";
  if (score >= 80) {
    health = "Excellent";
  } else if (score >= 60) {
    health = "Good";
  } else if (score >= 40) {
    health = "Moderate";
  }

  return {
    score,
    health,
    nutrients,
    issues
  };
}
