package com.ezpz.shabit.user.controller;

import com.ezpz.shabit.user.dto.req.UserTestReqDto;
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
import com.ezpz.shabit.user.dto.res.UserTestResDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@Slf4j
@RequestMapping("/api/v1/user")
@Tag(name = "user", description = "회원 API")
@RequiredArgsConstructor
public class UserController {

  private final EmailService emailService;

  private final UserService userService;

  // 이메일 중복체크 API
  @GetMapping("/email-check/{email}")
  public ResponseEntity<?> CheckEmail(@PathVariable String email) {
    log.info("input email : {}", email);
    try {
      boolean isPresent = userService.checkEmail(email);
      log.info("isPresent : {}", isPresent);

      if (isPresent) {
        return Response.makeResponse(HttpStatus.FORBIDDEN, "이미 사용 중인 Email 입니다.");
      } else {
        return Response.makeResponse(HttpStatus.OK, "존재하지 않는 Email 입니다.");
      }
    } catch (Exception e) {
      log.info(e.getMessage());
      return Response.badRequest("잘못된 요청입니다.");
    }
  }

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
}
