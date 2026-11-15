import fs from 'node:fs';
import path from 'node:path';

let patientId = '';

export interface CapturedPatient {
  bms: string;
  patientName: string;
  patientId: string;
  capturedAt: string;
}

const capturedPatientPath = path.resolve(
  process.cwd(),
  'src/test-data/runtime/captured-patient.json'
);

export const PatientBMS = {
  setPatientId(id: string) {
    patientId = id;
  },

  getPatientId() {
    return patientId;
  },

  setCapturedPatient(patient: Omit<CapturedPatient, 'capturedAt'>) {
    const directory = path.dirname(capturedPatientPath);
    fs.mkdirSync(directory, { recursive: true });

    const data: CapturedPatient = {
      ...patient,
      capturedAt: new Date().toISOString()
    };

    fs.writeFileSync(
      capturedPatientPath,
      JSON.stringify(data, null, 2),
      'utf-8'
    );

    console.log(
      `💾 Captured eligible patient: ${data.patientName} | ${data.patientId} | BMS: ${data.bms}`
    );
  },

  getCapturedPatient(): CapturedPatient {
    if (!fs.existsSync(capturedPatientPath)) {
      throw new Error(
        'No patient data was captured from Eligibility. Run the eligible patient test before Predetermination.'
      );
    }

    let patient: CapturedPatient;

    try {
      patient = JSON.parse(
        fs.readFileSync(capturedPatientPath, 'utf-8')
      ) as CapturedPatient;
    } catch {
      throw new Error(
        'Captured patient data file is invalid. Re-run the eligible patient test.'
      );
    }

    if (!patient.bms || !patient.patientName || !patient.patientId) {
      throw new Error(
        'Captured patient data is incomplete. Re-run the eligible patient test.'
      );
    }

    return patient;
  },

  clearCapturedPatient() {
    if (fs.existsSync(capturedPatientPath)) {
      fs.unlinkSync(capturedPatientPath);
    }
  }
};
