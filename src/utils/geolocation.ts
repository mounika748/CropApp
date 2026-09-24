import { INDIA_LOCATIONS } from '../data/locations';

export interface DetectedLocation {
  city: string;
  district: string;
  state: string;
  country: string;
  displayName: string;
  latitude: number;
  longitude: number;
  matchedStateKey?: string;
  matchedDistrictName?: string;
}

export type GeolocationErrorCode = 'PERMISSION_DENIED' | 'POSITION_UNAVAILABLE' | 'TIMEOUT' | 'UNKNOWN' | 'NOT_SUPPORTED';

export interface GeolocationErrorResult {
  code: GeolocationErrorCode;
  message: string;
}

/**
 * Requests device GPS location and reverse geocodes coordinates to actual city, district, state.
 */
export async function detectCurrentLocation(): Promise<{
  success: boolean;
  location?: DetectedLocation;
  error?: GeolocationErrorResult;
}> {
  if (typeof window === 'undefined' || !navigator.geolocation) {
    return {
      success: false,
      error: {
        code: 'NOT_SUPPORTED',
        message: 'Browser does not support geolocation'
      }
    };
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        try {
          const res = await fetch(`/api/reverse-geocode?lat=${lat}&lon=${lon}`);
          if (res.ok) {
            const data = await res.json();

            // Try to match detected state with INDIA_LOCATIONS keys
            let matchedStateKey: string | undefined;
            let matchedDistrictName: string | undefined;

            const stateLower = (data.state || '').toLowerCase().trim();
            const districtLower = (data.district || data.city || '').toLowerCase().trim();

            for (const key of Object.keys(INDIA_LOCATIONS)) {
              if (key.toLowerCase() === stateLower || stateLower.includes(key.toLowerCase()) || key.toLowerCase().includes(stateLower)) {
                matchedStateKey = key;
                break;
              }
            }

            if (matchedStateKey) {
              const stateData = INDIA_LOCATIONS[matchedStateKey];
              for (const dist of stateData.districts) {
                if (
                  dist.name.toLowerCase() === districtLower ||
                  districtLower.includes(dist.name.toLowerCase()) ||
                  dist.name.toLowerCase().includes(districtLower)
                ) {
                  matchedDistrictName = dist.name;
                  break;
                }
              }
            }

            resolve({
              success: true,
              location: {
                city: data.city || '',
                district: data.district || '',
                state: data.state || '',
                country: data.country || 'India',
                displayName: data.displayName || `${data.city || ''}, ${data.district || ''}, ${data.state || ''}`,
                latitude: lat,
                longitude: lon,
                matchedStateKey,
                matchedDistrictName
              }
            });
            return;
          }

          // Fallback if reverse geocode fails: still provide the coordinates
          resolve({
            success: true,
            location: {
              city: '',
              district: '',
              state: '',
              country: 'India',
              displayName: `GPS: ${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E`,
              latitude: lat,
              longitude: lon
            }
          });
        } catch {
          resolve({
            success: true,
            location: {
              city: '',
              district: '',
              state: '',
              country: 'India',
              displayName: `GPS: ${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E`,
              latitude: lat,
              longitude: lon
            }
          });
        }
      },
      (err) => {
        let code: GeolocationErrorCode = 'UNKNOWN';
        if (err.code === 1) code = 'PERMISSION_DENIED';
        else if (err.code === 2) code = 'POSITION_UNAVAILABLE';
        else if (err.code === 3) code = 'TIMEOUT';

        resolve({
          success: false,
          error: {
            code,
            message: err.message || 'Unable to retrieve location'
          }
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });
}
