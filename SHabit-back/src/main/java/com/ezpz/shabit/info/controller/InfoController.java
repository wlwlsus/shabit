package com.ezpz.shabit.info.controller;

import com.ezpz.shabit.info.dto.res.CategoryResDto;
import com.ezpz.shabit.info.dto.res.PhrasesResDto;
import com.ezpz.shabit.info.dto.res.VodResDto;
import com.ezpz.shabit.info.service.InfoService;
import com.ezpz.shabit.util.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/info")
@Slf4j
@RequiredArgsConstructor
public class InfoController {

  private final InfoService infoService;

  // 카테고리 리스트 조회 API
  @Operation(summary = "카테고리 리스트 조회 API")
  @GetMapping("/category")
  public ResponseEntity<?> getCategoryList() {
    try {
      List<CategoryResDto> result = infoService.getCategoryList();
      log.info("category list : {}", result);
      log.info("get categoryList successfully");
      return Response.makeResponse(HttpStatus.OK, "카테고리 목록 반환 성공", result.size(), result);
    } catch (Exception e) {
      log.error(e.getMessage());
      return Response.serverError("서버 에러");
    }
  }

  // 건강 문구 랜덤 조회 API
  @Operation(summary = "건강 문구 랜덤 조회 API")
  @GetMapping("/phrases")
  public ResponseEntity<?> getPhrases() {
    try {
      PhrasesResDto phrase = infoService.getPhrase();
      log.info("phrase : {}", phrase);
      return Response.makeResponse(HttpStatus.OK, "구문 가져오기 성공", 1, phrase);
    } catch (IllegalArgumentException e) {
      log.error("error : {}", e.getMessage());
      return Response.makeResponse(HttpStatus.BAD_REQUEST, "저장된 문구가 없습니다.");
    } catch (Exception e) {
      log.error("error : {}", e.getMessage());
      return Response.serverError("서버 에러");
    }
  }

  // 랜덤 영상 내보내기
  @Operation(summary = "랜덤 영상 내보내기 API")
  @GetMapping("/vods/{email}")
  public ResponseEntity<?> getVodList(@Parameter(description = "회원 이메일", required = true, example = "ssafy123@gmail.com")
                                      @PathVariable String email) {
    log.info("input email : {}", email);
    try {
      List<VodResDto> result = infoService.getVodList(email);
      if (result != null) {
        log.info("vodList : {} ", result);
        return Response.makeResponse(HttpStatus.OK, "영상 가져오기 성공", result.size(), result);
      } else {
        log.info("there is no video data");
        return Response.makeResponse(HttpStatus.OK, "영상 정보 부족", 0, null);
      }
    } catch (NoSuchElementException e) {
      log.error(e.getMessage());
      return Response.notFound("잘못된 요청입니다.");
    } catch (Exception e) {
      log.error("error : {}", e.getMessage());
      return Response.serverError("서버 에러");
    }
  }
}
