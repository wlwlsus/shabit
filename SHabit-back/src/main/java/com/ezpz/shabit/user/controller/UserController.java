package com.ezpz.shabit.user.controller;

import com.ezpz.shabit.user.service.UserService;
import com.ezpz.shabit.util.Response;
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
  private final UserService userService;

  @PutMapping("user/color/{thema}/{email}")
  public ResponseEntity<?> changeThema(@PathVariable String email, @PathVariable int thema) {
    log.info("email : {}, thema : {}", email, thema);
    try {
      userService.changeThema(email, thema);
      return Response.makeResponse(HttpStatus.OK, "테마 변경을 성공하였습니다.");
    } catch (NoSuchElementException s) {
      log.info(s.getMessage());
      return Response.noContent("존재하지 않는 이메일입니다.");
    } catch (Exception e) {
      log.info(e.getMessage());
      return Response.notFound("테마 변경을 실패하였습니다.");
    }
  }


}
