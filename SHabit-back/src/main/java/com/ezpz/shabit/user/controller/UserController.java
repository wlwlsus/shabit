package com.ezpz.shabit.user.controller;

import com.ezpz.shabit.user.dto.req.UserReqDto;
import com.ezpz.shabit.user.service.S3FileService;
import com.ezpz.shabit.user.service.UserService;
import com.ezpz.shabit.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/user/")
@Slf4j
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @PutMapping("nickname/{email}")
  public ResponseEntity<?> updateNickname(@PathVariable String email, @RequestBody UserReqDto user) {
    String nickname = user.getNickname();
    log.info("input email : {}, nickname : {}", email, nickname);
    try {
      userService.updateNickname(email, nickname);
      log.info("change nickname successfully");
      return Response.makeResponse(HttpStatus.OK, "닉네임 변경 성공");
    } catch (NoSuchElementException e) {
      log.error(e.getMessage());
      return Response.noContent("존재하지 않는 이메일");
    } catch (Exception e) {
      log.error(e.getMessage());
      return Response.badRequest("닉네임 변경 실패");
    }
  }

}
