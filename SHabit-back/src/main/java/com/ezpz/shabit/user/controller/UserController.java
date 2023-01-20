package com.ezpz.shabit.user.controller;

import com.ezpz.shabit.user.dto.req.UserReqDto;
import com.ezpz.shabit.user.dto.req.UserTestReqDto;
import com.ezpz.shabit.user.dto.res.UserTestResDto;
import com.ezpz.shabit.user.service.UserService;
import com.ezpz.shabit.util.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.NoSuchElementException;


@RestController
@Slf4j
@Tag(name = "user", description = "회원 API")
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

  private final UserService userService;

  @Operation(description = "회원가입 API", responses = {
          @ApiResponse(responseCode = "200", description = "회원가입 성공"),
          @ApiResponse(responseCode = "400", description = "회원가입 실패"),
  })
  @PostMapping("")
  public ResponseEntity<?> signUp(@RequestBody @Validated UserTestReqDto.SignUp signUp, Errors errors) {
    // validation check
    log.info(signUp.toString());
    if (errors.hasErrors()) {
      return Response.badRequest("회원가입에 실패하였습니다.");
    }

    return userService.signUp(signUp);
  }

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

  @Operation(description = "로그인 API", responses = {
          @ApiResponse(responseCode = "200", description = "로그인 성공", content = @Content(schema =
          @Schema(implementation = UserTestResDto.UserInfo.class))),
          @ApiResponse(responseCode = "400", description = "로그인 실패"),
  })
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody @Validated UserTestReqDto.Login login, Errors errors) {
    // validation  check
    log.info(login.toString());
    if (errors.hasErrors()) {
      return Response.badRequest("로그인에 실패하였습니다.");
    }

    return userService.login(login);
  }

  @Operation(description = "로그아웃 API", responses = {
          @ApiResponse(responseCode = "200", description = "로그아웃 성공"),
          @ApiResponse(responseCode = "400", description = "로그아웃 실패"),
  })
  @PostMapping("/logout")
  public ResponseEntity<?> logout(@RequestBody @Validated UserTestReqDto.Logout logout, Errors errors) {
    if (errors.hasErrors()) {
      return Response.badRequest("로그아웃을 실패하였습니다.");
    }
    return userService.logout(logout);
  }

  @Operation(description = "토큰 재발급 API", responses = {
          @ApiResponse(responseCode = "200", description = "토큰 재발급 성공", content = @Content(schema =
          @Schema(implementation = UserTestResDto.TokenInfo.class))),
          @ApiResponse(responseCode = "400", description = "토큰 재발급 실패"),
  })
  @PostMapping("/token")
  public ResponseEntity<?> reissue(@RequestBody @Validated UserTestReqDto.Reissue reissue, Errors errors) {
    // validation check
    if (errors.hasErrors()) {
      return Response.badRequest("토큰 재발급을 실패하였습니다.");
    }
    return userService.reissue(reissue);
  }

  @Operation(description = "회원 정보 API", responses = {
          @ApiResponse(responseCode = "200", description = "회원 정보 요청 성공", content = @Content(schema =
          @Schema(implementation = UserTestResDto.LoginUserRes.class))),
          @ApiResponse(responseCode = "400", description = "회원 정보 요청 실패"),
  })

  @GetMapping("/{email}")
  public ResponseEntity<?> userInfo(@PathVariable String email) {
    return userService.getUserInfo(email);
  }

  @PutMapping("/color/{thema}/{email}")
  public ResponseEntity<?> changeThema(@PathVariable String email, @PathVariable int thema) {
    log.info("email : {}, thema : {}", email, thema);
    try {
      userService.changeTheme(email, thema);
      return Response.makeResponse(HttpStatus.OK, "테마 변경을 성공하였습니다.");
    } catch (NoSuchElementException s) {
      log.info(s.getMessage());
      return Response.noContent("존재하지 않는 이메일입니다.");
    } catch (Exception e) {
      log.info(e.getMessage());
      return Response.notFound("테마 변경을 실패하였습니다.");
    }
  }

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
