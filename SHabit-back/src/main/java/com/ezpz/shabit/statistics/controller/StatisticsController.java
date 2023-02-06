package com.ezpz.shabit.statistics.controller;

import com.ezpz.shabit.statistics.dto.res.DailyResDto;
import com.ezpz.shabit.statistics.dto.res.StatisticsSimpleResDto;
import com.ezpz.shabit.statistics.entity.Daily;
import com.ezpz.shabit.statistics.dto.res.StatisticsSimpleResDto;
import com.ezpz.shabit.statistics.entity.Statistics;
import com.ezpz.shabit.statistics.dto.res.GrassResDto;
import com.ezpz.shabit.statistics.entity.Grass;
import com.ezpz.shabit.statistics.dto.req.DailyReqDto;
import com.ezpz.shabit.statistics.entity.Posture;
import com.ezpz.shabit.statistics.service.StatisticsServiceImpl;
import com.ezpz.shabit.util.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/statistics")
@RequiredArgsConstructor
@Slf4j
public class StatisticsController {

  private final StatisticsServiceImpl statisticsService;

  // 오늘 데이터 API
  @Operation(summary = "오늘 데이터 API")
  @GetMapping("/today/{email}")
  ResponseEntity<?> getTodayData(@Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
                                 @PathVariable String email) {
    List<Daily> data = null;
    try {
      data = statisticsService.getTodayData(email);
    } catch (Exception e) {
      log.error(e.getMessage());
    }

    if (data == null) return Response.notFound("일일 데이터 요청 실패");

    List<DailyResDto> resData = new ArrayList<>();
    data.forEach(d -> resData.add(DailyResDto.builder()
                                          .startTime(d.getStartTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                                          .endTime(d.getEndTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                                          .postureId(d.getPosture().getPostureId()).build()));
    return Response.makeResponse(HttpStatus.OK, "일일 데이터 가져오기 성공", resData.size(), resData);
  }

  // 잔디 데이터 API
  @Operation(summary = "잔디 데이터 API")
  @GetMapping("/grass/{email}")
  ResponseEntity<?> getGrassData(@Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
                                 @PathVariable String email) {
    List<Grass> data = null;
    try {
      data = statisticsService.getGrassData(email);
    } catch (Exception e) {
      log.error(e.getMessage());
    }

    if (data == null) return Response.notFound("잔디 가져오기 실패");

    List<GrassResDto> resData = new ArrayList<>();
    data.forEach(d -> resData.add(GrassResDto.builder()
                                          .date(d.getDate())
                                          .percentage(d.getPercentage()).build()));
    return Response.makeResponse(HttpStatus.OK, "잔디 가져오기 성공", resData.size(), resData);
  }

  // 주간 데이터 API
  @Operation(summary = "주간 데이터 API")
  @GetMapping("/weekly/{email}")
  ResponseEntity<?> getWeeklyData(@Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
                                  @PathVariable String email,
                                  @Parameter(description = "페이지 번호", required = true, example = "0")
                                  @RequestParam("page") int page) {
    List<Statistics> data = null;
    try {
      data = statisticsService.getWeeklyData(email, page);
    } catch (Exception e) {
      log.error(e.getMessage());
    }

    if (data == null) return Response.notFound("주간 데이터 가져오기 실패");

    List<StatisticsSimpleResDto> resData = new ArrayList<>();
    data.forEach(d -> resData.add(StatisticsSimpleResDto.builder()
                                          .date(d.getDate())
                                          .time(d.getTime())
                                          .postureId(d.getPosture().getPostureId()).build()));
    return Response.makeResponse(HttpStatus.OK, "주간 데이터 가져오기 성공", resData.size(), resData);
  }


  // 월간 데이터 API
  @Operation(summary = "월간 데이터 API")
  @GetMapping("/monthly/{email}")
  ResponseEntity<?> getMonthlyData(@Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
                                   @PathVariable String email,
                                   @Parameter(description = "페이지 번호", required = true, example = "0")
                                   @RequestParam("page") int page) {
    List<Statistics> data = null;
    try {
      data = statisticsService.getMonthlyData(email, page);
    } catch (Exception e) {
      log.error(e.getMessage());
    }

    if (data == null) return Response.notFound("월간 데이터 가져오기 실패");

    List<StatisticsSimpleResDto> resData = new ArrayList<>();
    data.forEach(d -> resData.add(StatisticsSimpleResDto.builder()
                                          .date(d.getDate())
                                          .time(d.getTime())
                                          .postureId(d.getPosture().getPostureId()).build()));
    return Response.makeResponse(HttpStatus.OK, "월간 데이터 가져오기 성공", resData.size(), resData);
  }

  // 트래킹 데이터 추가 API
  @Operation(summary = "트래킹 데이터 추가 API")
  @PostMapping("/{email}")
  ResponseEntity<?> insertTodayData(@Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
                                    @PathVariable String email,
                                    @Parameter(description = "트래킹 데이터")
                                    @RequestBody List<DailyReqDto> data) {
    int res = 0;
    try {
      res = statisticsService.insertTodayData(data, email);
    } catch (Exception e) {
      log.error(e.getMessage());
    }

    if (res == 0) return Response.notFound("트래킹 데이터 삽입 실패");

    return Response.ok("트래킹 데이터 삽입 완료");
  }

  // 자세 리스트 조회 API
  @Operation(summary = "자세 리스트 조회 API")
  @GetMapping("/posture")
  ResponseEntity<?> getPostureList() {
    List<Posture> data = null;
    try {
      data = statisticsService.getPostureList();
    } catch (Exception e) {
      log.error(e.getMessage());
    }

    if (data == null) return Response.notFound("자세 리스트 조회에 실패했습니다.");
    return Response.makeResponse(HttpStatus.OK, "자세 리스트 조회에 성공했습니다.", data.size(), data);
  }


}
