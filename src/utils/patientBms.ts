import fs from 'node:fs';
import path from 'node:path';

export interface CapturedPatient {
  bms: string;
  patientName: string;
  patientId: string;
  capturedAt: string;
}

const capturedPatientPath = path.resolve(
  process.cwd(),
  'src',
  'test-data',
  'runtime',
  'captured-patient.json'
);

let patientId = '';

export const PatientBMS = {
  setPatientId(id: string) {
    patientId = id;
  },

  getPatientId() {
    return patientId;
  },

  setCapturedPatient(patient: Omit<CapturedPatient, 'capturedAt'>) {
    fs.mkdirSync(path.dirname(capturedPatientPath), { recursive: true });

    const data: CapturedPatient = {
      ...patient,
      capturedAt: new Date().toISOString()
    };

    fs.writeFileSync(
      capturedPatientPath,
      JSON.stringify(data, null, 2),
      'utf-8'
    );

    console.log('💾 Captured patient details saved:', {
      patientName: data.patientName,
      patientId: data.patientId,
      bms: data.bms
    });
  },

  getCapturedPatient(): CapturedPatient {
    if (!fs.existsSync(capturedPatientPath)) {
      throw new Error(
        'Captured patient file was not found. Run the eligible patient test first.'
      );
    }

    const rawData = fs.readFileSync(capturedPatientPath, 'utf-8');
    const patient = JSON.parse(rawData) as CapturedPatient;

    if (!patient.patientName || !patient.patientId || !patient.bms) {
      throw new Error(
        'Captured patient file is incomplete. Re-run the eligible patient test.'
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
