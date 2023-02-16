package com.ezpz.shabit.user.controller;

import com.ezpz.shabit.user.dto.req.UserNicknameReqDto;
import com.ezpz.shabit.user.dto.req.UserPassChangeReqDto;
import com.ezpz.shabit.user.dto.req.UserTestReqDto;
import com.ezpz.shabit.user.dto.res.UserGalleryResDto;
import com.ezpz.shabit.user.dto.res.UserTestResDto;
import com.ezpz.shabit.user.service.EmailService;
import com.ezpz.shabit.user.service.UserService;
import com.ezpz.shabit.util.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@Slf4j
@RequestMapping("/api/v1/user")
@Tag(name = "user", description = "회원 API")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;
  private final EmailService emailService;

  @Operation(summary = "소셜 가입 여부 확인 API")
  @GetMapping(value = "/social/{email}")
  public ResponseEntity<?> getSocialType(@Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
                                         @PathVariable String email) {
    try {
      log.info("소셜 여부 확인 API");
      return userService.getSocialType(email);
    } catch (NoSuchElementException e) {
      log.error(e.getMessage());
      return Response.notFound("잘못된 요청입니다.");
    } catch (Exception e) {
      log.error(e.getMessage());
      return Response.serverError("서버 에러");
    }
  }

  // 프로필 사진 변경 API
  @Operation(summary = "프로필 사진 변경 API")
  @PutMapping(value = "/profile/{email}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<?> updateProfile(@Parameter(description = "변경할 프로필 사진", required = true)
                                         @RequestBody MultipartFile profile,
                                         @Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
                                         @PathVariable String email) {
    try {
      Map<String, String> result = new HashMap<>();
      String url = userService.updateProfile(email, profile);
      log.info("update user profile successfully");
      result.put("url", url);

      return Response.makeResponse(HttpStatus.OK, "프로필 이미지 변경 성공", result.size(), result);
    } catch (NoSuchElementException e) {
      log.error(e.getMessage());
      return Response.notFound("잘못된 요청입니다.");
    } catch (Exception e) {
      log.error(e.getMessage());
      return Response.serverError("서버 에러");
    }
  }

  // 프로필 사진 삭제 API
  @Operation(summary = "프로필 사진 삭제 API")
  @DeleteMapping("profile/{email}")
  public ResponseEntity<?> deleteProfile(@Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
                                         @PathVariable String email) {
    log.info("input email : {}", email);
    try {
      userService.deleteProfile(email);
      log.info("profile delete successfully");
      return Response.makeResponse(HttpStatus.OK, "프로필 사진 삭제 성공");
    } catch (NoSuchElementException e) {
      log.error(e.getMessage());
      return Response.notFound("잘못된 요청입니다.");
    } catch (Exception e) {
      log.error(e.getMessage());
      return Response.serverError("서버 에러");
    }
  }

  // 자세 사진 등록 API
  @Operation(summary = "자세 사진 등록 API")
  @PostMapping(value = "image/{email}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<?> addPostureImage(@Parameter(description = "등록할 자세 사진", required = true)
                                           @RequestBody MultipartFile image,
                                           @Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
                                           @PathVariable String email) {

    log.info("in addPostureImage API input email : {}", email);
    try {
      boolean success = userService.addPostureImage(email, image);
      if (success) {
        return Response.makeResponse(HttpStatus.OK, "자세 사진 등록 성공");
      } else {
        return Response.makeResponse(HttpStatus.CONFLICT, "이미 존재하는 사진입니다.");
      }
    } catch (NoSuchElementException e) {
      log.error(e.getMessage());
      return Response.notFound("잘못된 요청입니다.");
    } catch (Exception e) {
      log.error(e.getMessage());
      return Response.serverError("서버 에러");
    }
  }

  // 자세 사진 조회 API
  @Operation(summary = "자세 사진 조회 API")
  @GetMapping("image/{email}")
  public ResponseEntity<?> getPostureImage
  (@Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
   @PathVariable String email,
   @Parameter(description = "자세 아이디")
   @RequestParam(value = "query", defaultValue = "0") long postureId,
   @Parameter(description = "페이지 번호")
   @PageableDefault(size = 10, page = 0)
   Pageable pageable) {
    log.info("user email : {}, postureId : {}, page : {}", email, postureId, pageable.getPageNumber());
    try {
      List<UserGalleryResDto> list = userService.getPostureImage(email, postureId, pageable);
      userService.getAllPosture(email, postureId);
      log.info("gallery list : {}", list);

      long totalPosture = userService.getAllPosture(email, postureId);
      int totalPage = (int) Math.ceil((double) totalPosture / pageable.getPageSize());

      return Response.makeResponse(HttpStatus.OK, "자세 사진 조회 성공", totalPage, list);
    } catch (NoSuchElementException e) {
      log.error(e.getMessage());
      return Response.notFound("잘못된 요청입니다.");
    } catch (Exception e) {
      log.error(e.getMessage());
      return Response.serverError("서버 에러");
    }

  }

  // 이메일 중복체크 API
  @Operation(summary = "이메일 중복체크 API")
  @GetMapping("/email-check/{email}")
  public ResponseEntity<?> CheckEmail
  (@Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
   @PathVariable String email) {
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
      log.error(e.getMessage());
      return Response.serverError("서버 에러");
    }
  }


  // 이메일 인증 API
  @Operation(summary = "이메일 인증 API")
  @GetMapping("/email-valid/{email}")
  public ResponseEntity<?> certifyEmail
  (@Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
   @PathVariable String email) {
    log.info("send email : {}", email);
    try {
      String code = emailService.sendCertificationEmail(email);
      log.info("code : {}", code);

      return Response.makeResponse(HttpStatus.OK, "이메일 전송 성공", 1, code);
    } catch (Exception e) {
      log.error(e.getMessage());
      return Response.serverError("서버 에러");
    }
  }

  // 비밀번호 찾기 API
  @Operation(summary = "비밀번호 찾기 API")
  @PutMapping("/password-find/{email}")
  public ResponseEntity<?> findPassword
  (@Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
   @PathVariable String email) {
    log.info("input email : {}", email);
    try {
      // 회원인지 확인
      if (!userService.checkEmail(email))
        return Response.makeResponse(HttpStatus.BAD_REQUEST, "입력하신 이메일을 찾을 수 없습니다.");

      // 소셜 회원인지 확인
      if (userService.checkOAuthAccount(email))
        return Response.makeResponse(HttpStatus.BAD_REQUEST, "소셜 가입자는 이용할 수 없습니다.");

      String password = emailService.sendFindPasswordEmail(email);
      if (password.length() == 0) {
        return Response.serverError("서버 에러");
      } else {
        userService.updatePassword(email, password);
      }

      return Response.makeResponse(HttpStatus.OK, "임시 비밀번호 발급 완료");
    } catch (NoSuchElementException s) {
      log.error(s.getMessage());
      return Response.notFound("잘못된 요청입니다.");
    } catch (Exception e) {
      log.error(e.getMessage());
      return Response.serverError("서버 에러");
    }
  }

  // 비밀번호 변경 API
  @Operation(summary = "비밀번호 변경 API")
  @PutMapping("/password-change/{email}")
  public ResponseEntity<?> changePassword
  (@Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
   @PathVariable String email,
   @Parameter(description = "현재 비밀번호 & 변경할 비밀번호", required = true)
   @RequestBody @Validated UserPassChangeReqDto req,
   Errors errors) {
    try {
      // 회원인지 확인
      if (!userService.checkEmail(email))
        return Response.makeResponse(HttpStatus.BAD_REQUEST, "입력하신 이메일을 찾을 수 없습니다.");

      // 소셜 회원인지 확인
      if (userService.checkOAuthAccount(email))
        return Response.makeResponse(HttpStatus.BAD_REQUEST, "소셜 가입자는 이용할 수 없습니다.");

      log.info("input email : {}", email);

      String curPassword = req.getCurPassword();
      String changePassword = req.getChangePassword();
      if (errors.hasErrors()) {
        return Response.badRequest("변경하려는 비밀번호의 형식이 맞지 않습니다.");
      }

      log.info("curPassword : {}, changePassword : {}", curPassword, changePassword);
      boolean success = userService.changePassword(email, curPassword, changePassword);
      // curPassword와 현재 비밀번호가 다르다면
      if (!success) {
        // 비밀번호 변경 불가 -> badRequest 리턴
        log.info("UserController: 비밀번호 변경 불가");
        return Response.makeResponse(HttpStatus.FORBIDDEN, "현재 비밀번호와 불일치합니다.");
      }
      log.info("UserController: 비밀번호 변경 완료");
      return Response.makeResponse(HttpStatus.OK, "비밀번호 변경 완료");
    } catch (NoSuchElementException s) {
      log.error("in changePassword API " + s.getMessage());
      return Response.noContent("존재하지 않는 이메일 입니다.");
    } catch (Exception e) {
      log.error("in changePassword API " + e.getMessage());
      return Response.makeResponse(HttpStatus.NOT_FOUND, "비밀번호 변경 실패");
    }
  }

  // 테마변경 API
  @Operation(summary = "테마변경 API")
  @PutMapping("/color/{theme}/{email}")
  public ResponseEntity<?> changeTheme
  (@Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
   @PathVariable String email,
   @Parameter(description = "변경하려는 테마 번호", required = true, example = "1")
   @PathVariable int theme) {
    log.info("email : {}, theme : {}", email, theme);
    try {
      userService.changeThema(email, theme);
      return Response.makeResponse(HttpStatus.OK, "테마 변경을 성공하였습니다.");
    } catch (NoSuchElementException s) {
      log.error(s.getMessage());
      return Response.notFound("잘못된 요청입니다.");
    } catch (Exception e) {
      log.error(e.getMessage());
      return Response.serverError("서버 에러");
    }
  }

  @Operation(summary = "회원가입 API", responses = {
    @ApiResponse(responseCode = "200", description = "회원가입 성공"),
    @ApiResponse(responseCode = "400", description = "회원가입 실패"),
  })
  @PostMapping("")
  public ResponseEntity<?> signUp(@RequestBody @Validated UserTestReqDto.SignUp signUp, Errors errors) {
    // validation check
    log.info(signUp.toString());
    if (errors.hasErrors()) {
      log.error("signUp 에러 : {}", errors.getAllErrors());
      return Response.badRequest("회원가입에 실패하였습니다.");
    }

    return userService.signUp(signUp);
  }


  @Operation(summary = "로그인 API", responses = {
    @ApiResponse(responseCode = "200", description = "로그인 성공", content = @Content(schema =
    @Schema(implementation = UserTestResDto.UserInfo.class))),
    @ApiResponse(responseCode = "400", description = "로그인 실패"),
  })
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody @Validated UserTestReqDto.Login login, Errors errors) {
    // validation  check
    log.info(login.toString());
    if (errors.hasErrors()) {
      log.error("login 에러 : {}", errors.getAllErrors());
      return Response.badRequest("로그인에 실패하였습니다.");
    }

    return userService.login(login);
  }


  @Operation(summary = "로그아웃 API", responses = {
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


  @Operation(summary = "토큰 재발급 API", responses = {
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

  @Operation(summary = "회원 정보 API", responses = {
    @ApiResponse(responseCode = "200", description = "회원 정보 요청 성공", content = @Content(schema =
    @Schema(implementation = UserTestResDto.LoginUserRes.class))),
    @ApiResponse(responseCode = "400", description = "회원 정보 요청 실패"),
  })

  @GetMapping("/{email}")
  public ResponseEntity<?> userInfo(@PathVariable String email) {
    return userService.getUserInfo(email);
  }

  // 닉네임 변경 API
  @Operation(summary = "닉네임 변경 API")
  @PutMapping("/nickname/{email}")
  public ResponseEntity<?> updateNickname
  (@Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
   @PathVariable String email, @RequestBody @Validated UserNicknameReqDto user, Errors errors) {
    String nickname = user.getNickname();
    log.info("input email : {}, nickname : {}", email, nickname);
    if (errors.hasErrors()) {
      log.error("error in updateNickname");
      return Response.badRequest("닉네임 형식이 맞지 않습니다.");
    }
    try {
      userService.updateNickname(email, nickname);
      log.info("change nickname successfully");
      return Response.makeResponse(HttpStatus.OK, "닉네임 변경 성공");
    } catch (NoSuchElementException e) {
      log.error(e.getMessage());
      return Response.notFound("잘못된 요청입니다.");
    } catch (Exception e) {
      log.error(e.getMessage());
      return Response.serverError("서버 에러");
    }
  }
}
