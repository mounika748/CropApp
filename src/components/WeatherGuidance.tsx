import React, { useState, useEffect } from 'react';
import { CloudRain, Wind, Droplets, Thermometer, Sun, AlertTriangle, CheckCircle, Volume2, Square, RefreshCw, MapPin, Compass } from 'lucide-react';
import { LanguageCode, WeatherReport } from '../types';
import { INDIA_LOCATIONS } from '../data/locations';
import { getTranslation } from '../data/translations';
import { speakText, stopSpeaking } from '../utils/speech';
import { detectCurrentLocation, DetectedLocation } from '../utils/geolocation';

interface WeatherGuidanceProps {
  language: LanguageCode;
}

export const WeatherGuidance: React.FC<WeatherGuidanceProps> = ({ language }) => {
  const t = getTranslation(language);

  // STRICT RULE: No default hardcoded state or district
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [detectedLoc, setDetectedLoc] = useState<DetectedLocation | null>(null);
  const [isGps, setIsGps] = useState<boolean>(false);

  const [weather, setWeather] = useState<WeatherReport | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const stateNames = Object.keys(INDIA_LOCATIONS).sort();
  const availableDistricts = selectedState ? INDIA_LOCATIONS[selectedState]?.districts || [] : [];

  // Fetch real weather using actual coordinates
  const fetchWeatherForCoords = async (lat: number, lon: number, locationTitle: string) => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      if (!res.ok) {
        throw new Error('Weather API error');
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Generate strictly single-language farming advisories based on real meteorological parameters
      const advisories: string[] = [];

      if (language === 'te') {
        if (data.rainfall > 2) {
          advisories.push(`వర్ష సూచన: ప్రస్తుతం వర్షపాతం (${data.rainfall} మి.మీ) నమోదవుతోంది. యూరియా మరియు రసాయన పిచికారీని వాయిదా వేయండి.`);
          advisories.push('నీటి నిల్వ నివారణ: పంట చేలల్లో నీరు నిల్వ ఉండకుండా మురుగు కాలువలను శుభ్రం చేయండి.');
        } else {
          advisories.push('నీటి పారుదల సలహా: వాతావరణం పొడిగా ఉంది; పంట అవసరాన్ని బట్టి తగినంత నీటి తడి అందించండి.');
        }

        if (data.windSpeed > 18) {
          advisories.push(`గాలి వేగం హెచ్చరిక: గాలి వేగం గంటకు ${data.windSpeed} కి.మీ ఉంది. మందుల పిచికారీ చేయవద్దు.`);
        } else {
          advisories.push(`పిచికారీ అనుకూలత: గాలి వేగం గంటకు ${data.windSpeed} కి.మీ (అనుకూల పరిమితిలో ఉంది), పిచికారీకి అనుకూలం.`);
        }

        if (data.temperature > 35) {
          advisories.push('వేడి వాతావరణం: ఎండ తీవ్రత ఎక్కువగా ఉన్నందున ఉదయం లేదా సాయంత్రం వేళల్లోనే తడులు ఇవ్వండి.');
        }
      } else if (language === 'hi') {
        if (data.rainfall > 2) {
          advisories.push(`वर्षा चेतावनी: वर्तमान में वर्षा (${data.rainfall} मिमी) दर्ज की गई है। यूरिया और कीटनाशक छिड़काव रोक दें।`);
          advisories.push('जल निकास: खेतों में पानी जमा न होने दें, जल निकासी की व्यवस्था करें।');
        } else {
          advisories.push('सिंचाई परामर्श: मौसम शुष्क है; आवश्यकतानुसार फसलों की हल्की सिंचाई करें।');
        }

        if (data.windSpeed > 18) {
          advisories.push(`तेज हवा की चेतावनी: हवा की गति ${data.windSpeed} किमी/घंटा है। दवाओं का छिड़काव न करें।`);
        } else {
          advisories.push(`छिड़काव उपयुक्तता: हवा की गति ${data.windSpeed} किमी/घंटा है, जो छिड़काव के लिए पूरी तरह अनुकूल है।`);
        }

        if (data.temperature > 35) {
          advisories.push('अधिक तापमान: तेज धूप से फसलों को बचाने हेतु सुबह या शाम के समय ही सिंचाई करें।');
        }
      } else {
        if (data.rainfall > 2) {
          advisories.push(`Rain Alert: Active rainfall (${data.rainfall} mm). Postpone fertilizer top-dressing and pesticide spraying.`);
          advisories.push('Field Drainage: Clear field channels to avoid water stagnation.');
        } else {
          advisories.push('Irrigation Window: Dry weather conditions; irrigate according to soil moisture needs.');
        }

        if (data.windSpeed > 18) {
          advisories.push(`Wind Alert: Current wind speed is ${data.windSpeed} km/h. Avoid foliar sprays to prevent chemical drift.`);
        } else {
          advisories.push(`Spraying Window: Wind speed is ${data.windSpeed} km/h (within safe threshold <15-20 km/h) for protective sprays.`);
        }

        if (data.temperature > 35) {
          advisories.push('Heat Vigilance: Schedule light irrigations during morning or evening to relieve thermal stress.');
        }
      }

      setWeather({
        temperature: data.temperature,
        humidity: data.humidity,
        rainfall: data.rainfall,
        windSpeed: data.windSpeed,
        condition: data.condition,
        description: data.description,
        forecast: data.forecast || [],
        farmingAdvisories: advisories
      });
    } catch {
      setWeather(null);
      setErrorMsg(t.weatherUnavailable);
    } finally {
      setLoading(false);
    }
  };

  // Auto-detect current device location on mount
  useEffect(() => {
    let isMounted = true;

    async function initLocation() {
      setLoading(true);
      const res = await detectCurrentLocation();
      if (!isMounted) return;

      if (res.success && res.location) {
        setDetectedLoc(res.location);
        setIsGps(true);
        if (res.location.matchedStateKey) {
          setSelectedState(res.location.matchedStateKey);
        }
        if (res.location.matchedDistrictName) {
          setSelectedDistrict(res.location.matchedDistrictName);
        }
        await fetchWeatherForCoords(res.location.latitude, res.location.longitude, res.location.displayName);
      } else {
        setLoading(false);
        // Do NOT pick a default fake location!
        setErrorMsg(t.locationRequiredPrompt);
      }
    }

    initLocation();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle Manual GPS Detection Trigger
  const handleDetectGPS = async () => {
    setLoading(true);
    setErrorMsg(null);

    const res = await detectCurrentLocation();
    if (res.success && res.location) {
      setDetectedLoc(res.location);
      setIsGps(true);
      if (res.location.matchedStateKey) {
        setSelectedState(res.location.matchedStateKey);
      }
      if (res.location.matchedDistrictName) {
        setSelectedDistrict(res.location.matchedDistrictName);
      }
      await fetchWeatherForCoords(res.location.latitude, res.location.longitude, res.location.displayName);
    } else {
      setLoading(false);
      if (res.error?.code === 'PERMISSION_DENIED') {
        setErrorMsg(t.locationDeniedMessage);
      } else {
        setErrorMsg(t.locationFetchError);
      }
    }
  };

  // Handle Manual District Selection
  const handleManualDistrictSelect = (distName: string) => {
    setSelectedDistrict(distName);
    const distData = availableDistricts.find(d => d.name === distName);
    if (distData) {
      setIsGps(false);
      setDetectedLoc({
        city: distData.name,
        district: distData.name,
        state: selectedState,
        country: 'India',
        displayName: `${distData.name}, ${selectedState}`,
        latitude: distData.latitude,
        longitude: distData.longitude
      });
      fetchWeatherForCoords(distData.latitude, distData.longitude, `${distData.name}, ${selectedState}`);
    }
  };

  // Speech readout in strictly selected language
  const handleToggleAudio = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else if (weather && detectedLoc) {
      setIsSpeaking(true);
      let text = '';
      if (language === 'te') {
        text = `${detectedLoc.displayName} వాతావరణ సమాచారం: ఉష్ణోగ్రత ${weather.temperature} డిగ్రీలు, తేమ ${weather.humidity} శాతం, గాలి వేగం గంటకు ${weather.windSpeed} కిలోమీటర్లు. ${weather.farmingAdvisories[0] || ''}`;
      } else if (language === 'hi') {
        text = `${detectedLoc.displayName} मौसम: तापमान ${weather.temperature} डिग्री, नमी ${weather.humidity} प्रतिशत, हवा की गति ${weather.windSpeed} किमी/घंटा। ${weather.farmingAdvisories[0] || ''}`;
      } else {
        text = `Weather for ${detectedLoc.displayName}: Temperature ${weather.temperature}°C, humidity ${weather.humidity}%, wind speed ${weather.windSpeed} km/h. ${weather.farmingAdvisories[0] || ''}`;
      }
      speakText(text, language, () => {
        setIsSpeaking(false);
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Location Selection Bar (No Defaults) */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div>
            <h2 className="text-xl font-bold text-neutral-900 font-serif flex items-center gap-2">
              <Sun className="w-6 h-6 text-amber-500" />
              <span>{t.weatherLiveHeading}</span>
            </h2>
            <p className="text-xs text-neutral-600 mt-0.5">
              {language === 'te' ? 'మీ పరికరం యొక్క అసలైన జిపిఎస్ లేదా ఎంచుకున్న ప్రాంతం ఆధారంగా నిజమైన వాతావరణ సమాచారం.' : (language === 'hi' ? 'आपके डिवाइस के वास्तविक जीपीएस या चुने गए क्षेत्र पर आधारित मौसम जानकारी।' : 'Live meteorological data from your actual device GPS location or chosen district.')}
            </p>
          </div>

          <button
            type="button"
            onClick={handleDetectGPS}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <MapPin className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? t.locating : t.useMyLocation}</span>
          </button>
        </div>

        {/* Current Active Location Display */}
        {detectedLoc && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-300 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-emerald-950">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="font-bold">{t.locationDetectedPrefix}</span>
              <span className="font-semibold">{detectedLoc.displayName}</span>
              {isGps && (
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-bold">
                  {t.liveGpsTag}
                </span>
              )}
            </div>
            {weather && (
              <button
                type="button"
                onClick={() => fetchWeatherForCoords(detectedLoc.latitude, detectedLoc.longitude, detectedLoc.displayName)}
                className="text-emerald-800 hover:text-emerald-950 text-xs font-bold flex items-center gap-1"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>{language === 'te' ? 'తాజాకరించు' : (language === 'hi' ? 'अपडेट करें' : 'Refresh')}</span>
              </button>
            )}
          </div>
        )}

        {/* Location Error Notice */}
        {errorMsg && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Manual Location Selection (Starts EMPTY, No default state/district) */}
        <div className="mt-5 pt-4 border-t border-neutral-100">
          <span className="text-xs font-bold text-neutral-700 block mb-2">
            {language === 'te' ? 'లేదా ప్రాంతాన్ని స్వయంగా ఎంచుకోండి:' : (language === 'hi' ? 'या मैन्युअल रूप से स्थान चुनें:' : 'Or Select Location Manually:')}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-600 mb-1">{t.state}</label>
              <select
                value={selectedState}
                onChange={e => {
                  setSelectedState(e.target.value);
                  setSelectedDistrict('');
                }}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="" disabled>{t.selectStatePlaceholder}</option>
                {stateNames.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-600 mb-1">{t.district}</label>
              <select
                value={selectedDistrict}
                onChange={e => handleManualDistrictSelect(e.target.value)}
                disabled={!selectedState}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-neutral-100 disabled:cursor-not-allowed"
              >
                <option value="" disabled>{t.selectDistrictPlaceholder}</option>
                {availableDistricts.map(dist => (
                  <option key={dist.name} value={dist.name}>{dist.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Content */}
      {loading && !weather && (
        <div className="p-12 text-center bg-white rounded-xl border border-neutral-200">
          <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-neutral-700">{t.weatherRefreshing}</p>
        </div>
      )}

      {weather && (
        <div className="space-y-6">
          {/* Main Weather Metrics */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {detectedLoc?.displayName || 'Farm Location'}
                </span>
                <div className="text-4xl font-black text-neutral-900 mt-1 tabular-nums">
                  {weather.temperature}°C
                </div>
                <p className="text-xs font-semibold text-neutral-600 mt-1 capitalize">
                  {weather.condition} • {weather.description}
                </p>
              </div>

              <button
                type="button"
                onClick={handleToggleAudio}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold shadow-sm transition-all ${
                  isSpeaking ? 'bg-red-600 text-white animate-pulse' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isSpeaking ? <Square className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isSpeaking ? t.stopAudio : t.listenAudio}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 flex items-center gap-3">
                <Droplets className="w-5 h-5 text-blue-500 shrink-0" />
                <div>
                  <span className="text-[11px] text-neutral-500 font-semibold block">{t.humidity}</span>
                  <span className="text-base font-bold text-neutral-900 tabular-nums">{weather.humidity}%</span>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 flex items-center gap-3">
                <Wind className="w-5 h-5 text-cyan-600 shrink-0" />
                <div>
                  <span className="text-[11px] text-neutral-500 font-semibold block">
                    {language === 'te' ? 'గాలి వేగం' : (language === 'hi' ? 'हवा की गति' : 'Wind Speed')}
                  </span>
                  <span className="text-base font-bold text-neutral-900 tabular-nums">{weather.windSpeed} km/h</span>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 flex items-center gap-3">
                <CloudRain className="w-5 h-5 text-indigo-500 shrink-0" />
                <div>
                  <span className="text-[11px] text-neutral-500 font-semibold block">{t.rainfall}</span>
                  <span className="text-base font-bold text-neutral-900 tabular-nums">{weather.rainfall} mm</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          {weather.forecast && weather.forecast.length > 0 && (
            <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-neutral-900 mb-4">
                {language === 'te' ? '5 రోజుల వాతావరణ అంచనా' : (language === 'hi' ? '5 दिवसीय मौसम पूर्वानुमान' : '5-Day Agricultural Forecast')}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {weather.forecast.map((fc, i) => (
                  <div key={i} className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 text-center">
                    <span className="text-[11px] font-bold text-neutral-700 block mb-1">
                      {fc.date}
                    </span>
                    <div className="text-sm font-bold text-neutral-900 tabular-nums">
                      {fc.maxTemp}° / {fc.minTemp}°
                    </div>
                    <span className="text-[10px] text-neutral-500 block mt-1">
                      {fc.rain > 0 ? `${fc.rain} mm rain` : 'No rain'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Real Agricultural Advisories (Strictly localized) */}
          {weather.farmingAdvisories.length > 0 && (
            <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{t.farmingAdvice}</span>
              </h3>
              <ul className="space-y-2.5">
                {weather.farmingAdvisories.map((adv, idx) => (
                  <li key={idx} className="text-xs text-neutral-700 flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
