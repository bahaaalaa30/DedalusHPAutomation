const DEFAULT_API_BASE_URL = 'http://10.24.13.10';
const HP_APP_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRpdHlJZCI6Ik1PSEVHWSIsImlhdCI6MTU2MjM5NzA0NSwiYXVkIjoiSGVhbHRocGx1ZyBBcHBzIiwiaXNzIjoiSGVhbHRocGx1ZyBzZXJ2ZXIiLCJzdWIiOiJIZWFsdGhwbHVnIEFwcHMgdG9rZW4iLCJqdGkiOiJvZXI0NDVqZGxkc2tqZmgzOG9oZCJ9.I3KqgIdSvn0UTa7ZSm0rDdzNakLS8l5tWjjw4IJKsZY';

export function apiBaseUrl(): string {
  const value = process.env.API_BASE_URL ?? DEFAULT_API_BASE_URL;
  return value.replace(/\/$/, '');
}

export function apiHeaders(): Record<string, string> {
  const base = apiBaseUrl();

  return {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9,ar-AE;q=0.8,ar;q=0.7',
    Authorization: process.env.API_AUTHORIZATION ?? 'Bearer null',
    Origin: base,
    Referer: `${base}/healthplug/`,
    'hpApp-Token': HP_APP_TOKEN,
  };
}
