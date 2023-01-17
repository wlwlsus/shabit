package com.ezpz.shabit.admin.controller;

import com.ezpz.shabit.admin.service.AdminServiceImpl;
import com.ezpz.shabit.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final AdminServiceImpl adminService;

    @DeleteMapping("/phrase")
    ResponseEntity<?> deletePhrases(@RequestBody List<Integer> phrasesIdList) {
        int res = 0;
        try{
            res = adminService.deletePhrases(phrasesIdList);
        } catch (Exception e){
            log.info(e.getMessage());
        }

        if(res == 0) return Response.notFound("문구 삭제를 실패하였습니다.");
        return Response.ok("문구 삭제를 성공하였습니다.");
    }

}
