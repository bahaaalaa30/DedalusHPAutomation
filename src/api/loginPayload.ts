export interface ApiLoginPayload {
  password: string;
  deviceUuid: string;
  entityId: string;
  userid: string;
  source: string;
}

export function buildLoginPayload(username: string): ApiLoginPayload {
  return {
    password: process.env.API_PASSWORD ?? process.env.HP_PASSWORD ?? 'egy123',
    deviceUuid: process.env.API_DEVICE_UUID ?? '93eg2d',
    entityId: process.env.API_ENTITY_ID ?? 'MOHEGY',
    userid: username,
    source: process.env.API_SOURCE ?? 'MDWEB'
  };
}
