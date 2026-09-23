const env = (key: string, fallback = '') => process.env[key] ?? fallback;

export const config = {
  url: env('BASE_URL', 'http://10.24.13.10/healthplug/#/login'),
  visitBookingUrl: env('VISIT_BOOKING_URL', 'http://10.24.13.10/healthplug/#/user/visitbooking'),
  generalPractitionerUrl: env('GP_URL', 'http://10.24.13.10/healthplug/#/user/leads'),
  payerUrl: env('PAYER_URL', 'http://100.74.6.62/payer/#/login'),
  payerVisitBookingUrl: env('PAYER_VISIT_BOOKING_URL', 'http://100.74.6.62/payer/#/user/clinicaldiary'),
  username: env('HP_USERNAME'),
  password: env('HP_PASSWORD'),
  genUser: env('GEN_USER', 'genb6'),
  genPass: env('GEN_PASS'),
  cmoB6: env('CMO_B6', 'cmob6'),
  cmoPassword: env('CMO_PASSWORD'),
  elNasrDoctorUser: env('ELNASR_USER', 'P00250'),
  elNasrDoctorPassword: env('ELNASR_PASSWORD')
};
