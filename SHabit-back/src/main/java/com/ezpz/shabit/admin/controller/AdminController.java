package com.ezpz.shabit.admin.controller;

import com.ezpz.shabit.admin.service.AdminServiceImpl;
import com.ezpz.shabit.info.dto.req.VodReqDto;
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

    @PostMapping("/vods")
    ResponseEntity<?> insertVod(@RequestBody VodReqDto req) {
        int res = 0;
        try{
            res = adminService.insertVod(req);
        } catch (Exception e){
            log.info(e.getMessage());
        }

        if(res == 0) return Response.notFound("영상 등록에 실패하였습니다.");
        return Response.ok("영상 등록에 성공하였습니다.");
    }

}
