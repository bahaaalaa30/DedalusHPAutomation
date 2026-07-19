package utils;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class CsvDataReader {

    /**
     * Reads patient IDs from a CSV file and selects one completely at random.
     * @param filePath Path to the CSV file.
     * @return A random Patient ID as a String.
     */
    public static String getRandomPatientId(String filePath) {
        List<String> patientIds = new ArrayList<>();
        String line;

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            // Read the header line first to skip it
            String header = br.readLine();

            // Read all records
            while ((line = br.readLine()) != null) {
                if (!line.trim().isEmpty()) {
                    patientIds.add(line.trim());
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("❌ Failed to read Patient Data CSV file at: " + filePath, e);
        }

        if (patientIds.isEmpty()) {
            throw new RuntimeException("❌ The CSV file is empty. No Patient IDs found!");
        }

        // Random selection mechanism
        Random random = new Random();
        int randomIndex = random.nextInt(patientIds.size());

        String selectedId = patientIds.get(randomIndex);
        System.out.println("🎲 [Data Pool] Randomly selected Patient ID for this execution loop: " + selectedId);
        return selectedId;
    }
}