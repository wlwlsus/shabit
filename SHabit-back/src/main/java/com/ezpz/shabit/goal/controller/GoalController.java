package com.ezpz.shabit.goal.controller;

import com.ezpz.shabit.admin.dto.YouTubeDto;
import com.ezpz.shabit.goal.dto.req.GoalReqDto;
import com.ezpz.shabit.goal.dto.res.GoalResDto;
import com.ezpz.shabit.goal.entity.Goal;
import com.ezpz.shabit.goal.service.GoalServiceImpl;
import com.ezpz.shabit.info.dto.req.VodReqDto;
import com.ezpz.shabit.info.dto.res.VodResDto;
import com.ezpz.shabit.info.entity.Phrases;
import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.statistics.dto.res.DailyResDto;
import com.ezpz.shabit.statistics.entity.Daily;
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

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.InputMismatchException;
import java.util.List;

@RestController
@RequestMapping("api/v1/goal")
@RequiredArgsConstructor
@Slf4j
public class GoalController {

  private final GoalServiceImpl goalService;

  // 목표 조회 API
  @Operation(summary = "목표 조회 API")
  @GetMapping("/{email}")
  ResponseEntity<?> getGoal(@Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
                               @PathVariable String email) {
    GoalResDto res = null;
    try {
      res = goalService.getGoalData(email);
    } catch (Exception e) {
      log.error(e.getMessage());
    }

    if (res == null) return Response.notFound("목표 조회 실패");

    return Response.makeResponse(HttpStatus.OK, "목표 조회 성공", 1, res);
  }

  // 목표 수정 API
  @Operation(summary = "목표 수정 API")
  @PutMapping("/{email}")
  ResponseEntity<?> putGoal(@Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
                            @PathVariable String email,
                            @RequestBody GoalReqDto req) {
    GoalResDto res = null;
    try {
      res = goalService.putGoalData(email, req);
    } catch (Exception e) {
      log.error(e.getMessage());
    }

    if (res == null) return Response.notFound("목표 수정 실패");

    return Response.makeResponse(HttpStatus.OK, "목표 수정 성공", 1, res);
  }

}
