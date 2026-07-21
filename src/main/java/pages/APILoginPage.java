package pages;

public class APILoginPage {
    private String password;
    private String deviceUuid;
    private String entityId;
    private String userid;
    private String source;

    // Default Constructor (Required for JSON Deserialization)
    public APILoginPage() {}
    public APILoginPage(String password, String deviceUuid, String entityId, String userid, String source) {
        this.password = password;
        this.deviceUuid = deviceUuid;
        this.entityId = entityId;
        this.userid = userid;
        this.source = source;
    }

    // Getters and Setters
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getDeviceUuid() { return deviceUuid; }
    public void setDeviceUuid(String deviceUuid) { this.deviceUuid = deviceUuid; }

    public String getEntityId() { return entityId; }
    public void setEntityId(String entityId) { this.entityId = entityId; }

    public String getUserid() { return userid; }
    public void setUserid(String userid) { this.userid = userid; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
}