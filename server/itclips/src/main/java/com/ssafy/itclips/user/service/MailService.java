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
        String subject = "🔐 ITClips 이메일 인증을 완료하세요!";

        String content = "<html>" +
                "<body>" +
                "<h2>안녕하세요!</h2>" +
                "<p>ITClips에 가입해 주셔서 감사합니다.</p>" +
                "<p>이메일 인증을 위해 아래의 인증 코드를 입력해 주세요:</p>" +
                "<h3 style='color: #4CAF50;'>" + verificationCode + "</h3>" +
                "<p>이 코드는 10분 동안 유효합니다.</p>" +
                "<p>감사합니다.</p>" +
                "<p>ITClips 팀 드림</p>" +
                "</body>" +
                "</html>";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(content, true);
        helper.setFrom(email);

        mailSender.send(message);
        return verificationCode;
    }

    public void sendTemporaryPassword(String to, String temporaryPassword) throws MessagingException {
        String subject = "🔑 ITClips 임시 비밀번호 발급 안내";

        String content = "<html>" +
                "<body>" +
                "<h2>안녕하세요!</h2>" +
                "<p>ITClips에서 요청하신 임시 비밀번호를 발급해 드립니다.</p>" +
                "<p>아래의 임시 비밀번호를 사용하여 로그인해 주세요:</p>" +
                "<h3 style='color: #FF5722;'>" + temporaryPassword + "</h3>" +
                "<p>임시 비밀번호는 보안상 10분 후에 만료됩니다. </p>" +
                "<p>로그인 후 반드시 새로운 비밀번호로 변경해 주세요.</p>" +
                "<p>감사합니다.</p>" +
                "<p>ITClips 팀 드림</p>" +
                "</body>" +
                "</html>";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(content, true);
        helper.setFrom(email);

        mailSender.send(message);
    }


    private String generateVerificationCode() {
        int code = random.nextInt(999999);
        return String.format("%06d", code);
    }
}
