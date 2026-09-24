import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'server-api-endpoints',
      configureServer(server) {
        // Reverse geocoding API
        server.middlewares.use('/api/reverse-geocode', async (req, res) => {
          try {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const lat = url.searchParams.get('lat') || url.searchParams.get('latitude');
            const lon = url.searchParams.get('lon') || url.searchParams.get('longitude');

            if (!lat || !lon) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: 'Latitude and longitude are required' }));
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

              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({
                city,
                district,
                state,
                country,
                displayName,
                latitude: parseFloat(lat),
                longitude: parseFloat(lon)
              }));
            }

            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: 'Reverse geocoding unavailable' }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: 'Reverse geocoding failed', message: String(err) }));
          }
        });

        // Weather API
        server.middlewares.use('/api/weather', async (req, res) => {
          try {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const lat = url.searchParams.get('lat') || url.searchParams.get('latitude');
            const lon = url.searchParams.get('lon') || url.searchParams.get('longitude');

            if (!lat || !lon) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: 'Latitude and longitude are required to fetch weather' }));
            }

            const apiKey = process.env.WEATHER_API_KEY || process.env.OPENWEATHER_API_KEY;

            // If API key is provided, query OpenWeatherMap
            if (apiKey) {
              const owmUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
              const owmRes = await fetch(owmUrl);
              if (owmRes.ok) {
                const data = await owmRes.json();
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({
                  temperature: Math.round(data.main?.temp ?? 27),
                  humidity: data.main?.humidity ?? 65,
                  rainfall: data.rain?.['1h'] ?? 0,
                  windSpeed: Math.round((data.wind?.speed ?? 3.5) * 3.6),
                  condition: data.weather?.[0]?.main ?? 'Clear',
                  description: data.weather?.[0]?.description ?? 'Clear sky',
                  provider: 'OpenWeatherMap'
                }));
              }
            }

            // High-precision meteorological data via Open-Meteo
            const omUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
            const omRes = await fetch(omUrl);
            if (omRes.ok) {
              const data = await omRes.json();
              const curr = data.current;
              const code = curr?.weather_code ?? 0;
              
              const codeMap: Record<number, { cond: string; desc: string }> = {
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

              const forecast = (data.daily?.time || []).slice(0, 5).map((dateStr: string, idx: number) => ({
                date: dateStr,
                maxTemp: Math.round(data.daily.temperature_2m_max[idx] ?? 30),
                minTemp: Math.round(data.daily.temperature_2m_min[idx] ?? 20),
                rain: data.daily.precipitation_sum[idx] ?? 0,
                code: data.daily.weather_code[idx] ?? 0
              }));

              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({
                temperature: Math.round(curr.temperature_2m ?? 28),
                humidity: Math.round(curr.relative_humidity_2m ?? 60),
                rainfall: curr.precipitation ?? 0,
                windSpeed: Math.round(curr.wind_speed_10m ?? 12),
                condition: weatherInfo.cond,
                description: weatherInfo.desc,
                forecast,
                provider: 'Open-Meteo'
              }));
            }

            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: 'Meteorological service unavailable' }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Weather lookup failed', message: String(err) }));
          }
        });
      }
    }
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true
  }
});
