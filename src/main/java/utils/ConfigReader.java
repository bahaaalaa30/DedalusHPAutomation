package utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class ConfigReader {
    private static Properties properties;

    public static void loadConfig() {
        try {
            properties = new Properties();
            FileInputStream fis = new FileInputStream("C:\\Users\\wesam.ahmed\\OneDrive - Adeahub\\Desktop\\DedalusHPAutomation\\src\\test\\java\\resources\\config.properties");
            properties.load(fis);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("❌ Could not find config.properties file!");
        }
    }

    public static String getProperty(String key) {
        return properties.getProperty(key);
    }
}