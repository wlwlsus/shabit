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

  // 목표 조회 API
  @Operation(summary = "목표 조회 API")
  @GetMapping("/{email}")
  ResponseEntity<?> getGoal(@Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
                               @PathVariable String email) {

    return Response.makeResponse(HttpStatus.OK, "목표 조회 성공", 1, GoalResDto.builder().percentage(70).time(15).build());
  }

}
