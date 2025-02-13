package webbansach_backend.com.service;

public interface EmailService {
    // method tong quat
    public void sendMessage(String from, String to, String subject, String text);
}
