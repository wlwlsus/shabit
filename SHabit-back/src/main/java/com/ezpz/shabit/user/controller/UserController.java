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

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/user/")
@Slf4j
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;
  private final S3FileService s3FileService;

  @DeleteMapping("profile/{email}")
  public ResponseEntity<?> deleteProfile(@PathVariable String email) {
    log.info("input email : {}", email);
    try {
      userService.deleteProfile(email);
      log.info("profile delete successfully");
      return Response.makeResponse(HttpStatus.OK, "프로필 사진 삭제 성공");
    } catch (NoSuchElementException e) {
      log.error(e.getMessage());
      return Response.noContent("존재하지 않는 이메일");
    } catch (Exception e) {
      log.error(e.getMessage());
      return Response.badRequest("프로필 사진 삭제 실패");
    }

  }

}
