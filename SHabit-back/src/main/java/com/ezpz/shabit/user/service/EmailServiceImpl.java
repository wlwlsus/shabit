package com.ezpz.shabit.user.service;

import jakarta.mail.Message;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@Slf4j
public class EmailServiceImpl implements EmailService {

  JavaMailSender emailSender;
  public static final int CODE_LENGTH = 10;
  public static final String CODE = createdCode(CODE_LENGTH);

  @Autowired
  public EmailServiceImpl(JavaMailSender emailSender) {
    this.emailSender = emailSender;
  }

  @Override
  public String sendCertificationEmail(String email) throws Exception {
    MimeMessage message = emailSender.createMimeMessage();

    message.setFrom("dnzma13@naver.com");
    message.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
    message.setSubject("SHabit 회원가입 인증 메일");
    message.setText(createCertificationEmail(), "UTF-8", "html");
    log.info("CODE : {}", CODE);

    emailSender.send(message);

    return CODE;
  }

  private String createCertificationEmail() {
    StringBuilder message = new StringBuilder();

    message.append("<div style='margin:20px;'>")
            .append("<p>안녕하세요. SHabit 회원가입 인증 메일입니다.</p>")
            .append("<p>아래 코드를 복사해 입력해주세요.</p>")
            .append("<p>감사합니다.</p>")
            .append("<br>")
            .append("<div align='center' style='border:1px solid black; font-family:verdana';>")
            .append("<div style='font-size:130%'>")
            .append("CODE : <strong>" + CODE + "</strong>")
            .append("<div>")
            .append("</div>");

    return message.toString();
  }

  static private String createdCode(int length) {
    StringBuilder key = new StringBuilder();
    Random rnd = new Random();

    for (int i = 0; i < length; i++) {
      int index = rnd.nextInt(3); // 0~2 까지 랜덤

      switch (index) {
        case 0: //  a~z  (ex. 1+97=98 => (char)98 = 'b')
          key.append((char) ((int) (rnd.nextInt(26)) + 97));
          break;
        case 1: //  A~Z
          key.append((char) ((int) (rnd.nextInt(26)) + 65));
          break;
        case 2: // 0~9
          key.append((rnd.nextInt(10)));
          break;
      }
    }
    return key.toString();

  }
}
