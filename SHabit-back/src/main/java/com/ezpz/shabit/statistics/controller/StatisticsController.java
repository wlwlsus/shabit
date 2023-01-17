package com.ezpz.shabit.statistics.controller;

import com.ezpz.shabit.statistics.dto.res.GrassResDto;
import com.ezpz.shabit.statistics.entity.Grass;
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

    @GetMapping("/grass/{email}")
    ResponseEntity<?> getGrassData(@PathVariable String email) {
        List<Grass> data = null;
        try{
            data = statisticsService.getGrassData(email);
        } catch (Exception e){
            log.info(e.getMessage());
        }

        if(data == null) return Response.notFound("잔디 가져오기 실패");

        List<GrassResDto> resData = new ArrayList<>();
        data.forEach(d -> resData.add(GrassResDto.builder()
                        .date(d.getDate())
                        .percentage(d.getPercentage()).build()));
        return Response.makeResponse(HttpStatus.OK, "잔디 가져오기 성공", resData.size(), resData);
    }

}
