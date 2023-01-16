package com.ezpz.shabit.user.controller;

import com.ezpz.shabit.user.dto.req.UserTestReqDto;
import com.ezpz.shabit.user.service.UserService;
import com.ezpz.shabit.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
@RestController
public class UserController {

    private final UserService userService;

    @PostMapping("/")
    public ResponseEntity<?> signUp(@Validated UserTestReqDto.SignUp signUp, Errors errors) {
        // validation check
        if (errors.hasErrors()) {
            return Response.badRequest("회원가입에 실패하였습니다.");
        }
        log.info(signUp.toString());

        return userService.signUp(signUp);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Validated UserTestReqDto.Login login, Errors errors) {
        // validation  check
        if (errors.hasErrors()) {
            return Response.badRequest("로그인에 실패하였습니다.");
        }

        return userService.login(login);
    }
}
