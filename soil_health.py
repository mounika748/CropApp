def analyze_soil_health(nitrogen, phosphorus, potassium, ph):

    nutrients = {
        "Nitrogen": nitrogen,
        "Phosphorus": phosphorus,
        "Potassium": potassium,
        "pH": ph
    }

    score = 100
    issues = []

    if nitrogen < 40:
        score -= 15
        issues.append("Nitrogen is low.")
    elif nitrogen > 80:
        score -= 10
        issues.append("Nitrogen is high.")

    if phosphorus < 40:
        score -= 15
        issues.append("Phosphorus is low.")
    elif phosphorus > 80:
        score -= 10
        issues.append("Phosphorus is high.")

    if potassium < 40:
        score -= 15
        issues.append("Potassium is low.")
    elif potassium > 80:
        score -= 10
        issues.append("Potassium is high.")

    if ph < 5.5:
        score -= 15
        issues.append("Soil is acidic.")
    elif ph > 8.0:
        score -= 15
        issues.append("Soil is alkaline.")

    if score >= 80:
        health = "Excellent"
    elif score >= 60:
        health = "Good"
    elif score >= 40:
        health = "Moderate"
    else:
        health = "Poor"

    return {
        "score": score,
        "health": health,
        "nutrients": nutrients,
        "issues": issues
    }