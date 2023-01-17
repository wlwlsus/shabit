package com.ezpz.shabit.user.controller;

import com.ezpz.shabit.user.dto.req.UserTestReqDto;
import com.ezpz.shabit.user.service.UserService;
import com.ezpz.shabit.util.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "user", description = "회원 API")
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
@RestController
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

	@Operation(description = "로그인 API",  responses = {
					@ApiResponse(responseCode = "200", description = "로그인 성공"),
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
}
