package com.ezpz.shabit.admin.controller;

import com.ezpz.shabit.admin.service.AdminServiceImpl;
import com.ezpz.shabit.info.dto.req.PhrasesReqDto;
import com.ezpz.shabit.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final AdminServiceImpl adminService;

    @PostMapping("/phrase")
    ResponseEntity<?> insertPhrases(@RequestBody PhrasesReqDto req) {
        int res = 0;
        try{
            res = adminService.insertPhrases(req);
        } catch (Exception e){
            log.info(e.getMessage());
        }

        if(res == 0) return Response.notFound("문구 등록을 실패하였습니다.");
        return Response.ok("문구 등록을 성공하였습니다.");
    }
}
