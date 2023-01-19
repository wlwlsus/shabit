package com.ezpz.shabit.admin.controller;

import com.ezpz.shabit.admin.dto.res.SettingResDto;
import com.ezpz.shabit.admin.service.AdminServiceImpl;
import com.ezpz.shabit.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final AdminServiceImpl adminService;

    @GetMapping("/alarm")
    ResponseEntity<?> getSetting() {
        SettingResDto res = null;
        try{
            res = adminService.getSetting();
        } catch(NullPointerException e){
            log.info(e.getMessage());
            return Response.notFound("초기 세팅이 되어있지 않습니다.");
        } catch (Exception e){
            log.info(e.getMessage());
        }

        if(res == null) return Response.badRequest("세팅 조회에 실패하였습니다.");
        return Response.makeResponse(HttpStatus.OK, "세팅 조회에 성공했습니다.", 1, res);
    }

}
