package com.ezpz.shabit.statistics.controller;

import com.ezpz.shabit.statistics.dto.res.DailyResDto;
import com.ezpz.shabit.statistics.entity.Daily;
import com.ezpz.shabit.statistics.service.StatisticsServiceImpl;
import com.ezpz.shabit.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/statistics")
@RequiredArgsConstructor
@Slf4j
public class StatisticsController {

    private final StatisticsServiceImpl statisticsService;

    @GetMapping("/today/{email}")
    ResponseEntity<?> getTodayData(@PathVariable String email) {
        List<Daily> data = null;
        try{
            data = statisticsService.getTodayData(email);
        } catch (Exception e){
            log.info(e.getMessage());
        }

        if(data == null) return Response.notFound("일일 데이터 요청 실패");

        List<DailyResDto> resData = new ArrayList<>();
        data.forEach(d -> resData.add(DailyResDto.builder()
                        .startTime(d.getStartTime())
                        .endTime(d.getEndTime())
                        .posture(d.getPosture().getName()).build()));
        return Response.makeResponse(HttpStatus.OK, "일일 데이터 가져오기 성공", resData.size(), resData);
    }

}
