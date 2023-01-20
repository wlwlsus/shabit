package com.ezpz.shabit.admin.controller;

import com.ezpz.shabit.admin.service.AdminServiceImpl;
import com.ezpz.shabit.info.dto.res.VodResDto;
import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.InputMismatchException;
import java.util.List;

@RestController
@RequestMapping("api/v1/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final AdminServiceImpl adminService;

    @GetMapping("/vods")
    ResponseEntity<?> getVodList(@RequestParam String search, @RequestParam String query) {
        List<Vod> data = null;
        try{
            data = adminService.getVodList(search, query);
        } catch(InputMismatchException e) {
            log.info(e.getMessage());
            return Response.badRequest(e.getMessage());
        } catch (Exception e){
            log.info(e.getMessage());
        }

        if(data == null) return Response.notFound("영상 리스트 조회를 실패하였습니다");

        List<VodResDto> resData = new ArrayList<>();
        data.forEach(d -> resData.add(VodResDto.builder()
                .categoryId(d.getCategory().getCategoryId())
                .length(d.getLength())
                .title(d.getTitle())
                .videoId(d.getVideoId())
                .thumbnail(d.getThumbnail())
                .originalLength(d.getOriginalLength())
                .build()));
        return Response.makeResponse(HttpStatus.OK, "영상 리스트 조회를 성공하였습니다", resData.size(), resData);
    }


    @DeleteMapping("/vods")
    ResponseEntity<?> deleteVod(@RequestBody List<Integer> vodIdList) {
        int res = 0;
        try{
            res = adminService.deleteVod(vodIdList);
        } catch (Exception e){
            log.info(e.getMessage());
        }

        if(res == 0) return Response.notFound("영상 삭제에 실패하였습니다.");
        return Response.ok("영상 삭제에 성공하였습니다.");
    }


}
