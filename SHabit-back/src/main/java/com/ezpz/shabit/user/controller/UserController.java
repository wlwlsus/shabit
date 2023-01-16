package com.ezpz.shabit.user.controller;

import com.ezpz.shabit.user.service.EmailService;
import com.ezpz.shabit.user.service.UserService;
import com.ezpz.shabit.util.Response;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/")
@Slf4j
@RequiredArgsConstructor
public class UserController {

  private final EmailService emailService;

  // 이메일 인증 API
  @GetMapping("email/{email}")
  public ResponseEntity<?> certifyEmail(@PathVariable String email) {
    log.info("send email : {}", email);
    try {
      String code = emailService.sendCertificationEmail(email);
      log.info("code : {}", code);

      return Response.makeResponse(HttpStatus.OK, "이메일 전송 성공", 1, code);
    } catch (Exception e) {
      log.error(e.getMessage());
      return Response.badRequest("이메일 전송 실패");
    }
  }

}
