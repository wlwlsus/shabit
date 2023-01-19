package com.ezpz.shabit.admin.controller;

import com.ezpz.shabit.admin.dto.req.SettingReqDto;
import com.ezpz.shabit.admin.service.AdminServiceImpl;
import com.ezpz.shabit.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final AdminServiceImpl adminService;

    @PutMapping("/alarm")
    ResponseEntity<?> deletePhrases(@RequestBody SettingReqDto req) {
        int res = 0;
        try{
            res = adminService.editSetting(req);
        } catch(NullPointerException e){
            log.info(e.getMessage());
            return Response.notFound("초기 세팅이 되어있지 않습니다.");
        } catch (Exception e){
            log.info(e.getMessage());
        }

        if(res == 0) return Response.badRequest("세팅 수정에 실패하였습니다.");
        return Response.ok("세팅 수정에 성공하였습니다.");
    }

}
