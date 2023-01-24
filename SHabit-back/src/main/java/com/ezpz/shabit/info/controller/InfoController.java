package com.ezpz.shabit.info.controller;

import com.ezpz.shabit.info.dto.res.CategoryResDto;
import com.ezpz.shabit.info.dto.res.PhrasesResDto;
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
@RequestMapping("/api/v1/info")
@Slf4j
@RequiredArgsConstructor
public class InfoController {

  private final InfoService infoService;

  // 카테고리 리스트 조회 API
  @GetMapping("/category")
  public ResponseEntity<?> getCategoryList() {
    try {
      List<CategoryResDto> result = infoService.getCategoryList();
      log.info("category list : {}", result);
      log.info("get categoryList successfully");
      return Response.makeResponse(HttpStatus.OK, "카테고리 목록 반환 성공", result.size(), result);
    } catch (Exception e) {
      return Response.badRequest("카테고리 목록 반환 실패");
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

  // 랜덤 영상 내보내기
  @GetMapping("vods/{email}")
  public ResponseEntity<?> getVodList(@PathVariable String email) {
    log.info("input email : {}", email);
    try {
      List<VodResDto> result = infoService.getVodList(email);
      log.info("vodList : {} ", result);
      return Response.makeResponse(HttpStatus.OK, "영상 가져오기 성공", result.size(), result);
    } catch (IllegalArgumentException e) {
      log.error(e.getMessage());
      return Response.noContent("영상 정보 부족");
    } catch (Exception e) {
      log.info("error : {}", e.getClass());
      return Response.notFound("영상 가져오기 실패");
    }
  }
}
