package com.ezpz.shabit.statistics.controller;

import com.ezpz.shabit.statistics.dto.req.DailyReqDto;
import com.ezpz.shabit.statistics.entity.Posture;
import com.ezpz.shabit.statistics.service.StatisticsServiceImpl;
import com.ezpz.shabit.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/statistics")
@RequiredArgsConstructor
@Slf4j
public class StatisticsController {

    private final StatisticsServiceImpl statisticsService;

    @GetMapping("/posture")
    ResponseEntity<?> getPostureList() {
        List<Posture> data = null;
        try{
            data = statisticsService.getPostureList();
        } catch (Exception e){
            log.info(e.getMessage());
        }

        if(data == null) return Response.notFound("자세 리스트 조회에 실패했습니다.");
        return Response.makeResponse(HttpStatus.OK, "자세 리스트 조회에 성공했습니다.", data.size(), data);
    }

}
