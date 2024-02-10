namespace Application.Smtp;

public record SmtpConfiguration(
    string Host,
    int Port,
    string Username,
    string Password,
    bool EnableSsl);