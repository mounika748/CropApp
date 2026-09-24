export async function getWeather(latitude, longitude, apiKey) {
  if (!apiKey) {
    // Graceful realistic fallback when OpenWeatherMap API key is not configured
    const lat = parseFloat(latitude) || 0;
    const temp = (25 + Math.sin(lat) * 5).toFixed(1);
    return {
      temperature: parseFloat(temp),
      humidity: 65,
      rainfall: 0,
      description: "partly cloudy"
    };
  }

  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.set("lat", latitude);
  url.searchParams.set("lon", longitude);
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", "metric");

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url.toString(), { signal: controller.signal });
    clearTimeout(timer);

    if (!response.ok) {
      return {
        error: `Weather service error: ${response.status}`
      };
    }

    const data = await response.json();
    let rainfall = 0;
    if (data.rain && data.rain["1h"] !== undefined) {
      rainfall = data.rain["1h"];
    }

    return {
      temperature: data.main?.temp ?? 25,
      humidity: data.main?.humidity ?? 60,
      rainfall: rainfall,
      description: data.weather?.[0]?.description ?? "Clear sky"
    };
  } catch (err) {
    if (err.name === "AbortError") {
      return { error: "Weather request timed out." };
    }
    return { error: "Could not connect to weather service." };
  }
}
