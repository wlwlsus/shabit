package com.ezpz.shabit.info.controller;

import com.ezpz.shabit.info.dto.res.VodResDto;
import com.ezpz.shabit.info.service.InfoService;
import com.ezpz.shabit.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/info/")
@Slf4j
@RequiredArgsConstructor
public class InfoController {

  private final InfoService infoService;

  // 랜덤 영상 내보내기
  @GetMapping("vods/{email}")
  public ResponseEntity<?> getVodList(@PathVariable String email) {
    log.info("input email : {}", email);
    try {
      List<VodResDto> result = infoService.getVodList(email);
      log.info("vodList : {} ", result);
      return Response.makeResponse(HttpStatus.OK, "영상 가져오기 성공", result.size(), result);
    } catch (Exception e) {
      log.info("error : {}", e.getClass());
      return Response.notFound("영상 가져오기 실패");
    }
  }
}

