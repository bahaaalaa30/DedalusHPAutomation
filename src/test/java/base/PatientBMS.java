package base;

import lombok.Getter;

public class PatientBMS {

    @Getter
    private static String patientId;

    @Getter
    public static String patientIdByBMS;

    public static void setPatientId(String patientId) {
        PatientBMS.patientId = patientId;
    }

    public static void setPatientIdByBMS(String patientIdByBMS) {
        PatientBMS.patientIdByBMS = patientIdByBMS;

    }

    public String getPatientIdByBMS(String patientIdFromBMS) {
        return PatientBMS.patientIdByBMS;
    }
}