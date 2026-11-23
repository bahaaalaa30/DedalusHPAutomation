const env = (key: string, fallback = '') => process.env[key] ?? fallback;

export const config = {
  url: env('BASE_URL', 'http://10.24.13.10/healthplug/#/login'),
  visitBookingUrl: env('VISIT_BOOKING_URL', 'http://10.24.13.10/healthplug/#/user/visitbooking'),
  generalPractitionerUrl: env('GP_URL', 'http://10.24.13.10/healthplug/#/user/leads'),
  payerUrl: env('PAYER_URL', 'http://100.74.6.62/payer/#/login'),
  payerVisitBookingUrl: env('PAYER_VISIT_BOOKING_URL', 'http://100.74.6.62/payer/#/user/clinicaldiary'),
  username: env('CMO_USERNAME', 'cmob6'),
  password: env('CMO_PASSWORD', 'egy123'),
  genUser: env('GEN_USER', 'genb6'),
  genPass: env('GEN_PASSWORD', 'egy123'),
  cmoB6: env('CMO_USERNAME', 'S00001'),
  cmoPassword: env('CMO_PASSWORD', 'egy123'),
  AlArabDoctorUserName: env('AL_ARAB_DOCTOR_USER', 'P00250'),
  AlArabDoctorPassword: env('AL_ARAB_DOCTOR_PASSWORD', 'egy123')
};
