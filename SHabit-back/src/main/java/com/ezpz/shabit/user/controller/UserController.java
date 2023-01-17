package com.ezpz.shabit.user.controller;

import com.ezpz.shabit.user.service.EmailService;
import com.ezpz.shabit.user.service.UserService;
import com.ezpz.shabit.util.Response;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/")
@Slf4j
@RequiredArgsConstructor
public class UserController {
  private final EmailService emailService;
  private final UserService userService;

  @PutMapping("user/{email}")
  public ResponseEntity<?> findPassword(@PathVariable String email) {
    log.info("input email : {}", email);
    try {
      String password = emailService.sendFindPasswordEmail(email);
      if (password.length() == 0) {
        return Response.makeResponse(HttpStatus.INTERNAL_SERVER_ERROR, "임시 비밀번호 발급 실패");
      } else {
        userService.updatePassword(email, password);
      }
      return Response.makeResponse(HttpStatus.OK, "임시 비밀번호 발급 완료");
    } catch (NoSuchElementException s) {
      log.info(s.getMessage());
      return Response.noContent("존재하지 않는 이메일 입니다.");
    } catch (Exception e) {
      log.info(e.getMessage());
      return Response.makeResponse(HttpStatus.NOT_FOUND, "잘못된 데이터입니다.");
    }
  }

}
