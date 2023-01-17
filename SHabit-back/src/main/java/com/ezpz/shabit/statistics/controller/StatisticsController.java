package com.ezpz.shabit.statistics.controller;

import com.ezpz.shabit.statistics.dto.req.DailyReqDto;
import com.ezpz.shabit.statistics.service.StatisticsServiceImpl;
import com.ezpz.shabit.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/statistics")
@RequiredArgsConstructor
@Slf4j
public class StatisticsController {

    private final StatisticsServiceImpl statisticsService;

    @PostMapping("/{email}")
    ResponseEntity<?> insertTodayData(@PathVariable String email, @RequestBody List<DailyReqDto> data) {
        int res = 0;
        try{
            res = statisticsService.insertTodayData(data, email);
        } catch (Exception e){
            log.info(e.getMessage());
        }

        if(res == 0) return Response.notFound("트래킹 데이터 삽입 실패");

        return Response.ok("트래킹 데이터 삽입 완료");
    }

}
