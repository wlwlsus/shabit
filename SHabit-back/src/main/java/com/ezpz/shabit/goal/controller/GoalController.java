package com.ezpz.shabit.goal.controller;

import com.ezpz.shabit.admin.dto.YouTubeDto;
import com.ezpz.shabit.goal.dto.res.GoalResDto;
import com.ezpz.shabit.info.dto.req.VodReqDto;
import com.ezpz.shabit.info.dto.res.VodResDto;
import com.ezpz.shabit.info.entity.Phrases;
import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.util.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.InputMismatchException;
import java.util.List;

@RestController
@RequestMapping("api/v1/goal")
@RequiredArgsConstructor
@Slf4j
public class GoalController {


  // 목표 설정 API
  @Operation(summary = "목표 설정 API")
  @PostMapping("/{email}")
  ResponseEntity<?> updateGoal(@Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
                                  @PathVariable String email) {
//    int res = 0;
//    try {
//      res = statisticsService.insertTodayData(data, email);
//    } catch (Exception e) {
//      log.error(e.getMessage());
//    }
//
//    if (res == 0) return Response.notFound("트래킹 데이터 삽입 실패");
//
//    return Response.ok("트래킹 데이터 삽입 완료");

    return Response.ok("목표 설정 완료");
  }

}
