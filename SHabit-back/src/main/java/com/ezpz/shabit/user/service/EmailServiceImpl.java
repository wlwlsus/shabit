package com.ezpz.shabit.user.service;

import jakarta.mail.Message;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

  private final JavaMailSender mailSender;
  private final int CODE_LENGTH = 8;
  private String CODE;

  @Value("{mail.setFrom}")
  String fromEmail;

  @Override
  public String sendFindPasswordEmail(String email) throws Exception {
    MimeMessage message = mailSender.createMimeMessage();

    message.setFrom(fromEmail);
    message.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
    message.setSubject("SHabit 임시 비밀번호 발급 메일");
    message.setText(createFindPasswordEmail(), "UTF-8", "html");
    try {
      mailSender.send(message);
    } catch (Exception e) {
      log.error(e.getMessage());
      return "";
    }
    return CODE;
  }

  private String createFindPasswordEmail() {
    StringBuilder message = new StringBuilder();
    CODE = createdCode(CODE_LENGTH);
    message.append("\t<table align=\"center\" width=\"670\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"\n" +
                           "\t\tstyle=\"border: 3px solid #F2E4E6;\n" +
                           "    box-shadow: 0px 2px 10px #F2E4E6;\n" +
                           "    border-radius: 30px;\">\n" +
                           "\t\t<tbody>\n" +
                           "\t\t\t<tr>\n" +
                           "\t\t\t\t<td style=\"background-color: #ffffff;border-radius: 30px; padding: 40px 30px 0 35px; text-align: center;\">\n" +
                           "\t\t\t\t\t<table width=\"605\" cellpadding=\"0\" cellspacing=\"0\" style=\"text-align: left; font-family: '맑은 고딕','돋움';\">\n" +
                           "\t\t\t\t\t\t<tbody>\n" +
                           "\t\t\t\t\t\t\t<tr>\n" +
                           "\t\t\t\t\t\t\t\t<td\n" +
                           "\t\t\t\t\t\t\t\t\tstyle=\"color: #C67983; font-size: 25px; text-align: left; width: 352px; word-spacing: -1px; vertical-align: top;\">\n" +
                           "\t\t\t\t\t\t\t\t\t임시 비밀번호 확인 후<br>\n" +
                           "\t\t\t\t\t\t\t\t\t로그인을 완료해 주세요.\n" +
                           "\t\t\t\t\t\t\t\t</td>\n" +
                           "\t\t\t\t\t\t\t\t<td rowspan=\"3\"><img style=\"width: 200px;\"\n" +
                           "\t\t\t\t\t\t\t\t\t\tsrc=\"https://ssafy601.s3.ap-northeast-2.amazonaws.com/shabit_logo_pink.png\"\n" +
                           "\t\t\t\t\t\t\t\t\t\tloading=\"lazy\"></td>\n" +
                           "\t\t\t\t\t\t\t</tr>\n" +
                           "\t\t\t\t\t\t\t<tr>\n" +
                           "\t\t\t\t\t\t\t\t<td height=\"39\"><img style=\"width: 60px;\"\n" +
                           "\t\t\t\t\t\t\t\t\t\tsrc=\"https://ssafy601.s3.ap-northeast-2.amazonaws.com/shabit_bar.png\"\n" +
                           "\t\t\t\t\t\t\t\t\t\tloading=\"lazy\"></td>\n" +
                           "\t\t\t\t\t\t\t</tr>\n" +
                           "\t\t\t\t\t\t\t<tr>\n" +
                           "\t\t\t\t\t\t\t\t<td style=\"font-size: 17px; vertical-align: bottom; height: 27px;\">안녕하세요? SHabit입니다.</td>\n" +
                           "\t\t\t\t\t\t\t</tr>\n" +
                           "\t\t\t\t\t\t\t<tr>\n" +
                           "\t\t\t\t\t\t\t\t<td colspan=\"2\" style=\"font-size: 13px; word-spacing: -1px; height: 30px;\">아래 비밀번호를 입력하시고\n" +
                           "\t\t\t\t\t\t\t\t\t로그인을 계속 진행해 주세요.</td>\n" +
                           "\t\t\t\t\t\t\t</tr>\n" +
                           "\t\t\t\t\t\t</tbody>\n" +
                           "\t\t\t\t\t</table>\n" +
                           "\t\t\t\t</td>\n" +
                           "\t\t\t</tr>\n" +
                           "\t\t\t<tr>\n" +
                           "\t\t\t\t<td style=\"padding: 39px 196px 70px;\">\n" +
                           "\t\t\t\t\t<table width=\"278\" style=\"background-color: #C67983; font-family: '맑은 고딕','돋움';\">\n" +
                           "\t\t\t\t\t\t<tbody>\n" +
                           "\t\t\t\t\t\t\t<tr>\n" +
                           "\t\t\t\t\t\t\t\t<td height=\"49\" style=\"text-align: center; color: #fff\">비밀번호 : <span>")
            .append(CODE)
            .append("</span>\n" +
                            "\t\t\t\t\t\t\t\t</td>\n" +
                            "\t\t\t\t\t\t\t</tr>\n" +
                            "\t\t\t\t\t\t</tbody>\n" +
                            "\t\t\t\t\t</table>\n" +
                            "\t\t\t\t</td>\n" +
                            "\t\t\t</tr>\n" +
                            "\t\t</tbody>\n" +
                            "\t</table>");

    return message.toString();
  }

  @Override
  public String sendCertificationEmail(String email) throws Exception {
    MimeMessage message = mailSender.createMimeMessage();

    message.setFrom(fromEmail);
    message.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
    message.setSubject("SHabit 회원가입 인증 메일");
    message.setText(createCertificationEmail(), "UTF-8", "html");
    log.info("CODE : {}", CODE);

    mailSender.send(message);

    return CODE;
  }

  private String createCertificationEmail() {
    StringBuilder message = new StringBuilder();
    CODE = createdCode(CODE_LENGTH);
    message.append("\t<table align=\"center\" width=\"670\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"\n" +
                           "\t\tstyle=\"border: 3px solid #F2E4E6;\n" +
                           "    box-shadow: 0px 2px 10px #F2E4E6;\n" +
                           "    border-radius: 30px;\">\n" +
                           "\t\t<tbody>\n" +
                           "\t\t\t<tr>\n" +
                           "\t\t\t\t<td style=\"background-color: #ffffff;border-radius: 30px; padding: 40px 30px 0 35px; text-align: center;\">\n" +
                           "\t\t\t\t\t<table width=\"605\" cellpadding=\"0\" cellspacing=\"0\" style=\"text-align: left; font-family: '맑은 고딕','돋움';\">\n" +
                           "\t\t\t\t\t\t<tbody>\n" +
                           "\t\t\t\t\t\t\t<tr>\n" +
                           "\t\t\t\t\t\t\t\t<td\n" +
                           "\t\t\t\t\t\t\t\t\tstyle=\"color: #C67983; font-size: 25px; text-align: left; width: 352px; word-spacing: -1px; vertical-align: top;\">\n" +
                           "\t\t\t\t\t\t\t\t\t인증 번호 확인 후<br>\n" +
                           "\t\t\t\t\t\t\t\t\t이메일 인증을 완료해 주세요.\n" +
                           "\t\t\t\t\t\t\t\t</td>\n" +
                           "\t\t\t\t\t\t\t\t<td rowspan=\"3\"><img style=\"width: 200px;\"\n" +
                           "\t\t\t\t\t\t\t\t\t\tsrc=\"https://shabit.s3.ap-northeast-2.amazonaws.com/shabit_logo_pink.png\"\n" +
                           "\t\t\t\t\t\t\t\t\t\tloading=\"lazy\"></td>\n" +
                           "\t\t\t\t\t\t\t</tr>\n" +
                           "\t\t\t\t\t\t\t<tr>\n" +
                           "\t\t\t\t\t\t\t\t<td height=\"39\"><img style=\"width: 60px;\"\n" +
                           "\t\t\t\t\t\t\t\t\t\tsrc=\"https://shabit.s3.ap-northeast-2.amazonaws.com/shabit_bar.PNG\"\n" +
                           "\t\t\t\t\t\t\t\t\t\tloading=\"lazy\"></td>\n" +
                           "\t\t\t\t\t\t\t</tr>\n" +
                           "\t\t\t\t\t\t\t<tr>\n" +
                           "\t\t\t\t\t\t\t\t<td style=\"font-size: 17px; vertical-align: bottom; height: 27px;\">안녕하세요? SHabit입니다.</td>\n" +
                           "\t\t\t\t\t\t\t</tr>\n" +
                           "\t\t\t\t\t\t\t<tr>\n" +
                           "\t\t\t\t\t\t\t\t<td colspan=\"2\" style=\"font-size: 13px; word-spacing: -1px; height: 30px;\">아래 인증번호를 입력하시고\n" +
                           "\t\t\t\t\t\t\t\t\t회원가입을 계속 진행해 주세요.</td>\n" +
                           "\t\t\t\t\t\t\t</tr>\n" +
                           "\t\t\t\t\t\t</tbody>\n" +
                           "\t\t\t\t\t</table>\n" +
                           "\t\t\t\t</td>\n" +
                           "\t\t\t</tr>\n" +
                           "\t\t\t<tr>\n" +
                           "\t\t\t\t<td style=\"padding: 39px 196px 70px;\">\n" +
                           "\t\t\t\t\t<table width=\"278\" style=\"background-color: #C67983; font-family: '맑은 고딕','돋움';\">\n" +
                           "\t\t\t\t\t\t<tbody>\n" +
                           "\t\t\t\t\t\t\t<tr>\n" +
                           "\t\t\t\t\t\t\t\t<td height=\"49\" style=\"text-align: center; color: #fff\">인증번호 : <span>")
            .append(CODE)
            .append("</span>\n" +
                            "\t\t\t\t\t\t\t\t</td>\n" +
                            "\t\t\t\t\t\t\t</tr>\n" +
                            "\t\t\t\t\t\t</tbody>\n" +
                            "\t\t\t\t\t</table>\n" +
                            "\t\t\t\t</td>\n" +
                            "\t\t\t</tr>\n" +
                            "\t\t</tbody>\n" +
                            "\t</table>");

    return message.toString();
  }


  static private String createdCode(int length) {
    StringBuilder key = new StringBuilder();
    Random rnd = new Random();

    for (int i = 0; i < length; i++) {
      int index = rnd.nextInt(2); // 0~2 까지 랜덤

      switch (index) {
        case 0: //  A~Z
          key.append((char) ((int) (rnd.nextInt(26)) + 65));
          break;
        case 1: // 0~9
          key.append((rnd.nextInt(10)));
          break;
      }
    }
    return key.toString();

  }

}
