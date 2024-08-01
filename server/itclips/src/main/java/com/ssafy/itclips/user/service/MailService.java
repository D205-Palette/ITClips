package com.ssafy.itclips.user.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class MailService {
    private final JavaMailSender mailSender;
    private final Random random = new Random();

    @Value("${spring.mail.username}")
    private String email;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public String sendVerificationEmail(String to) throws MessagingException {
        String verificationCode = generateVerificationCode();
        String subject = "Email Verification Code";
        String content = "Your verification code is: " + verificationCode;

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(content);
        helper.setFrom(email);

        mailSender.send(message);
        return verificationCode;
    }

    public void sendTemporaryPassword(String to, String temporaryPassword) throws MessagingException {
        String subject = "Itclips 임시 비밀번호 발급 안내";
        String content = "임시 비밀번호 : " + temporaryPassword;

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setSubject(subject);
        helper.setText(content);
        helper.setTo(to);
        helper.setFrom(email);

        mailSender.send(message);
    }

    private String generateVerificationCode() {
        int code = random.nextInt(999999);
        return String.format("%06d", code);
    }
}
