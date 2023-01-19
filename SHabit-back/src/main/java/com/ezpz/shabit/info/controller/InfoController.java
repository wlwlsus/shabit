package com.ezpz.shabit.info.controller;

import com.ezpz.shabit.info.dto.CategoryResDto;
import com.ezpz.shabit.info.entity.Category;
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
@RequestMapping("/api/v1/info/")
@Slf4j
@RequiredArgsConstructor
public class InfoController {

  private final InfoService infoService;

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

}
