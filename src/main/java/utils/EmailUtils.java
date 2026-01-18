package utils;
import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;

public class EmailUtils {

    public static void sendEmailReport(String summaryText) {
        // إعدادات السيرفر (مثال لـ Gmail)
        String host = "smtp.gmail.com";
        final String user = "bahaaa946@gmail.com"; // إيميل الراسل
        final String password = "japr flbu dxxe liws"; // كلمة مرور التطبيقات (App Password)
        String to = "bmaati@bsnswheel.com, sokrat_art2011@yahoo.com"; // إيميل المستلم

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(user, password);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(user));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            message.setSubject("Dedalus Automation HP - Execution Report");

            // محتوى الإيميل
            String htmlContent = "<h1>Automation Execution Summary</h1>" +
                    "<p>" + summaryText + "</p>" +
                    "<p>Check full Allure Report here: <a href='http://localhost:8080/job/Dedalus_HP_Automation/allure'>View Report</a></p>";

            message.setContent(htmlContent, "text/html; charset=utf-8");

            Transport.send(message);
            System.out.println("✅ Email sent successfully!");

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}