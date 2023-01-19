package com.ezpz.shabit.user.controller;

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

  private final S3FileService s3FileService;
  private final UserService userService;

  @PutMapping("profile/{email}")
  public ResponseEntity<?> updateProfile(@RequestPart("profile") MultipartFile profile, @PathVariable String email) {
    try {
      Map<String, String> result = new HashMap<>();
      String url = s3FileService.upload(profile, "profile");
      userService.updateProfile(email, url);
      result.put("url", url);

      return Response.makeResponse(HttpStatus.OK, "프로필 이미지 변경 성공", result.size(), result);
    } catch (NoSuchElementException e) {
      log.info(e.getMessage());
      return Response.noContent("존재하지 않는 이메일입니다.");
    } catch (Exception e) {
      log.info(e.getMessage());
      return Response.badRequest("프로필 이미지 변경 실패");
    }
  }

}
