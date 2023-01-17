package com.ezpz.shabit.admin.controller;

import com.ezpz.shabit.admin.service.AdminServiceImpl;
import com.ezpz.shabit.info.entity.Phrases;
import com.ezpz.shabit.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final AdminServiceImpl adminService;

    @GetMapping("/phrase")
    ResponseEntity<?> getPhrasesList() {
        List<Phrases> data = null;
        try{
            data = adminService.getPhrasesList();
        } catch (Exception e){
            log.info(e.getMessage());
        }

        if(data == null) return Response.notFound("문구 리스트 조회를 실패하였습니다");

        List<String> resData = new ArrayList<>();
        data.forEach(d -> resData.add(d.getContent()));
        return Response.makeResponse(HttpStatus.OK, "문구 리스트 조회를 성공하였습니다", resData.size(), resData);
    }

}
