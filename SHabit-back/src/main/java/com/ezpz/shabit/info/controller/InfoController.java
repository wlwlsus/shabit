package com.ezpz.shabit.info.controller;

import com.ezpz.shabit.info.dto.res.PhrasesResDto;
import com.ezpz.shabit.info.dto.res.VodResDto;
import com.ezpz.shabit.info.entity.Phrases;
import com.ezpz.shabit.info.service.InfoService;
import com.ezpz.shabit.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
@Slf4j
@RequiredArgsConstructor
public class InfoController {

  private final InfoService infoService;

  // 랜덤 영상 조회 API
  @GetMapping("vods")
  public ResponseEntity<?> getVodList() {
    try {
      List<VodResDto> result = infoService.getVodList();
      log.info("vodList : {} ", result);
      return Response.makeResponse(HttpStatus.OK, "영상 가져오기 성공", result.size(), result);
    } catch (Exception e) {
      log.info("error : {}", e.getClass());
      return Response.notFound("영상 가져오기 실패");
    }
  }

  // 건강 문구 랜덤 조회 API
  @GetMapping("phrases")
  public ResponseEntity<?> getPhrases() {
    try {
      PhrasesResDto phrase = infoService.getPhrase();
      log.info("phrase : {}", phrase);
      return Response.makeResponse(HttpStatus.OK, "구문 가져오기 성공", 1, phrase);
    } catch (Exception e) {
      log.info("error : {}", e.getClass());
      return Response.notFound("구문 가져오기 실패");
    }
  }

}
