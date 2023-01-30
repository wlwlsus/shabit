package com.ezpz.shabit.config;

import com.ezpz.shabit.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Slf4j
public class ErrorController {

    @GetMapping("token-error")
    ResponseEntity<?> error(){
        return Response.notFound("토큰 정보가 일치하지 않습니다.");
    }
}
