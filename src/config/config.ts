const env = (key: string, fallback = '') => process.env[key] ?? fallback;

export const config = {
  url: env('BASE_URL', 'http://10.24.13.10/healthplug/#/login'),
  visitBookingUrl: env('VISIT_BOOKING_URL', 'http://10.24.13.10/healthplug/#/user/visitbooking'),
  generalPractitionerUrl: env('GP_URL', 'http://10.24.13.10/healthplug/#/user/leads'),
  payerUrl: env('PAYER_URL', 'http://100.74.6.62/payer/#/login'),
  payerVisitBookingUrl: env('PAYER_VISIT_BOOKING_URL', 'http://100.74.6.62/payer/#/user/clinicaldiary'),
  username: env('CMOB6', 'cmob6'),
  password: env('CMO_PASSWORD', 'egy123'),
  genUser: env('genb6', 'genb6'),
  genPass: env('123'),
  cmoB6: env('CMOB6', 'cmob6'),
  cmoPassword: env('CMO_PASSWORD', 'egy123'),
  elNasrDoctorUser: env('P00250', 'P00250'),
  elNasrDoctorPassword: env('egy123')
};
