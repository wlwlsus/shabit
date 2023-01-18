package com.ezpz.shabit.statistics.controller;

import com.ezpz.shabit.statistics.dto.res.StatisticsSimpleResDto;
import com.ezpz.shabit.statistics.entity.Statistics;
import com.ezpz.shabit.statistics.service.StatisticsServiceImpl;
import com.ezpz.shabit.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/statistics")
@RequiredArgsConstructor
@Slf4j
public class StatisticsController {

    private final StatisticsServiceImpl statisticsService;

    @GetMapping("/monthly/{email}")
    ResponseEntity<?> getWeeklyData(@PathVariable String email, @RequestParam("page") int page) {
        List<Statistics> data = null;
        try{
            data = statisticsService.getMonthlyData(email, page);
        } catch (Exception e){
            log.info(e.getMessage());
        }

        if(data == null) return Response.notFound("월간 데이터 가져오기 실패");

        List<StatisticsSimpleResDto> resData = new ArrayList<>();
        data.forEach(d -> resData.add(StatisticsSimpleResDto.builder()
                .date(d.getDate())
                .time(d.getTime())
                .postureId(d.getPosture().getPostureId()).build()));
        return Response.makeResponse(HttpStatus.OK, "월간 데이터 가져오기 성공", resData.size(), resData);
    }

}
