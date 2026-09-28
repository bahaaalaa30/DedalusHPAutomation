const DEFAULT_API_BASE_URL = 'http://10.24.13.10';

export function apiBaseUrl(): string {
  const value = process.env.API_BASE_URL ?? DEFAULT_API_BASE_URL;
  return value.replace(/\/$/, '');
}

export function apiHeaders(): Record<string, string> {
  const base = apiBaseUrl();
  const token = process.env.HP_APP_TOKEN?.trim();

  if (!token) {
    throw new Error(
      'HP_APP_TOKEN environment variable is required to call the Login API.'
    );
  }

  return {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9,ar-AE;q=0.8,ar;q=0.7',
    Authorization: process.env.API_AUTHORIZATION ?? 'Bearer null',
    Origin: base,
    Referer: `${base}/healthplug/`,
    'hpApp-Token': token,
  };
}
