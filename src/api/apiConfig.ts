export function apiBaseUrl(): string {
  const value = process.env.API_BASE_URL ?? process.env.BASE_URL;
  if (!value) throw new Error('API_BASE_URL is required');
  return value.replace(/\/$/, '');
}

export function apiHeaders(): Record<string,string> {
  const base = apiBaseUrl();
  const headers: Record<string,string> = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9,ar-AE;q=0.8,ar;q=0.7',
    Origin: base,
    Referer: base + '/healthplug/'
  };
  const token = process.env.HP_APP_TOKEN;
  if (token) headers['hpApp-Token'] = token;
  return headers;
}
