import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Reverse geocoding API endpoint (uses actual device coordinates)
app.get('/api/reverse-geocode', async (req, res) => {
  try {
    const lat = req.query.lat || req.query.latitude;
    const lon = req.query.lon || req.query.longitude;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
    const geoRes = await fetch(nominatimUrl, {
      headers: {
        'User-Agent': 'CropApp-Agricultural-Advisory/1.0 (contact: support@cropapp.local)'
      }
    });

    if (geoRes.ok) {
      const data = await geoRes.json();
      const addr = data.address || {};
      const city = addr.city || addr.town || addr.village || addr.suburb || addr.municipality || addr.county || '';
      const district = addr.state_district || addr.county || addr.district || city;
      const state = addr.state || '';
      const country = addr.country || 'India';
      const displayName = data.display_name || `${city}, ${district}, ${state}`;

      return res.json({
        city,
        district,
        state,
        country,
        displayName,
        latitude: parseFloat(lat),
        longitude: parseFloat(lon)
      });
    }

    return res.status(502).json({ error: 'Reverse geocoding service unavailable' });
  } catch (err) {
    return res.status(500).json({ error: 'Reverse geocoding failed', message: String(err) });
  }
});

// Weather API endpoint using real coordinates
app.get('/api/weather', async (req, res) => {
  try {
    const lat = req.query.lat || req.query.latitude;
    const lon = req.query.lon || req.query.longitude;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required to fetch weather' });
    }

    const apiKey = process.env.WEATHER_API_KEY || process.env.OPENWEATHER_API_KEY;

    if (apiKey) {
      const owmUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const owmRes = await fetch(owmUrl);
      if (owmRes.ok) {
        const data = await owmRes.json();
        return res.json({
          temperature: Math.round(data.main?.temp ?? 27),
          humidity: data.main?.humidity ?? 65,
          rainfall: data.rain?.['1h'] ?? 0,
          windSpeed: Math.round((data.wind?.speed ?? 3.5) * 3.6),
          condition: data.weather?.[0]?.main ?? 'Clear',
          description: data.weather?.[0]?.description ?? 'Clear sky',
          provider: 'OpenWeatherMap'
        });
      }
    }

    // High-precision meteorological data via Open-Meteo
    const omUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
    const omRes = await fetch(omUrl);
    if (omRes.ok) {
      const data = await omRes.json();
      const curr = data.current || {};
      const code = curr.weather_code ?? 0;

      const codeMap = {
        0: { cond: 'Clear', desc: 'Clear sunny sky' },
        1: { cond: 'Mainly Clear', desc: 'Mainly clear' },
        2: { cond: 'Partly Cloudy', desc: 'Partly cloudy' },
        3: { cond: 'Overcast', desc: 'Overcast clouds' },
        45: { cond: 'Foggy', desc: 'Morning fog or mist' },
        51: { cond: 'Light Drizzle', desc: 'Light drizzle' },
        61: { cond: 'Light Rain', desc: 'Slight rain shower' },
        63: { cond: 'Moderate Rain', desc: 'Moderate rain' },
        65: { cond: 'Heavy Rain', desc: 'Heavy monsoon downpour' },
        80: { cond: 'Rain Showers', desc: 'Localized rain showers' },
        95: { cond: 'Thunderstorm', desc: 'Thunderstorm activity' }
      };

      const weatherInfo = codeMap[code] || { cond: 'Clear', desc: 'Clear sky' };

      const forecast = (data.daily?.time || []).slice(0, 5).map((dateStr, idx) => ({
        date: dateStr,
        maxTemp: Math.round(data.daily.temperature_2m_max?.[idx] ?? 30),
        minTemp: Math.round(data.daily.temperature_2m_min?.[idx] ?? 20),
        rain: data.daily.precipitation_sum?.[idx] ?? 0,
        code: data.daily.weather_code?.[idx] ?? 0
      }));

      return res.json({
        temperature: Math.round(curr.temperature_2m ?? 28),
        humidity: Math.round(curr.relative_humidity_2m ?? 60),
        rainfall: curr.precipitation ?? 0,
        windSpeed: Math.round(curr.wind_speed_10m ?? 12),
        condition: weatherInfo.cond,
        description: weatherInfo.desc,
        forecast,
        provider: 'Open-Meteo'
      });
    }

    return res.status(502).json({ error: 'Meteorological service unavailable' });
  } catch (err) {
    return res.status(500).json({ error: 'Weather lookup failed', message: String(err) });
  }
});

// Legacy weather endpoint support
app.get('/weather-data', (req, res) => {
  res.redirect(`/api/weather?lat=${req.query.latitude || ''}&lon=${req.query.longitude || ''}`);
});

// Serve Vite production build from dist folder
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// For all other web requests, send index.html (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`CropApp production server running on http://0.0.0.0:${PORT}`);
});
