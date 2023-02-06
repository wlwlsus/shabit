package com.ezpz.shabit.admin.controller;

import com.ezpz.shabit.admin.dto.YouTubeDto;
import com.ezpz.shabit.admin.dto.req.SettingReqDto;
import com.ezpz.shabit.admin.dto.res.SettingResDto;
import com.ezpz.shabit.admin.service.AdminServiceImpl;
import com.ezpz.shabit.admin.service.youtube.YouTubeServiceImpl;
import com.ezpz.shabit.info.dto.req.PhrasesReqDto;
import com.ezpz.shabit.info.dto.req.VodReqDto;
import com.ezpz.shabit.info.dto.res.VodResDto;
import com.ezpz.shabit.info.entity.Phrases;
import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.util.Response;
import io.lettuce.core.dynamic.annotation.Param;
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

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.InputMismatchException;

@RestController
@RequestMapping("api/v1/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

  private final AdminServiceImpl adminService;
  private final YouTubeServiceImpl youtubeService;

  // 건강 문구 등록 API
  @Operation(summary = "건강 문구 등록 API")
  @PostMapping("/phrase")
  ResponseEntity<?> insertPhrases(@Parameter(description = "등록할 문구") @RequestBody PhrasesReqDto req) {
    int res = 0;
    try {
      res = adminService.insertPhrases(req);
    } catch (DataIntegrityViolationException e) {
      log.info(e.getMessage());
      return Response.badRequest("이미 존재하는 문구입니다.");
    } catch (Exception e) {
      log.info(e.getMessage());
    }

    if (res == 0) return Response.notFound("문구 등록을 실패하였습니다.");
    return Response.ok("문구 등록을 성공하였습니다.");
  }

  // 건강 문구 리스트 조회 API
  @Operation(summary = "건강 문구 리스트 조회 API")
  @GetMapping("/phrase")
  ResponseEntity<?> getPhrasesList(@PageableDefault(size=10, page=0, sort="phrasesId", direction= Sort.Direction.DESC) Pageable pageable) {
    List<Phrases> data = null;
    try {
      data = adminService.getPhrasesList(pageable);
    } catch (Exception e) {
      log.info(e.getMessage());
    }

    if (data == null) return Response.notFound("문구 리스트 조회를 실패하였습니다");

    List<String> resData = new ArrayList<>();
    data.forEach(d -> resData.add(d.getContent()));
    return Response.makeResponse(HttpStatus.OK, "문구 리스트 조회를 성공하였습니다", resData.size(), resData);
  }

  // 전체 영상 리스트 API
  @Operation(summary = "전체 영상 리스트 API")
  @GetMapping("/vods")
  ResponseEntity<?> getVodList(@Parameter(description = "검색 분류")
                               @RequestParam String search,
                               @Parameter(description = "검색어")
                               @RequestParam String query,
                               @PageableDefault(size=10, page=0, sort="vodId", direction= Sort.Direction.DESC) Pageable pageable) {
    List<Vod> data = null;
    try {
      data = adminService.getVodList(search, query, pageable);
    } catch (InputMismatchException e) {
      log.info(e.getMessage());
      return Response.badRequest(e.getMessage());
    } catch (Exception e) {
      log.info(e.getMessage());
    }

    if (data == null) return Response.notFound("영상 리스트 조회를 실패하였습니다");

    List<VodResDto> resData = new ArrayList<>();
    data.forEach(d -> resData.add(VodResDto.builder()
                                          .category(d.getCategory())
                                          .length(d.getLength())
                                          .title(d.getTitle())
                                          .videoId(d.getVideoId())
                                          .thumbnail(d.getThumbnail())
                                          .originalLength(d.getOriginalLength())
                                          .build()));
    return Response.makeResponse(HttpStatus.OK, "영상 리스트 조회를 성공하였습니다", resData.size(), resData);
  }

  // 영상 삭제 API
  @Operation(summary = "영상 삭제 API")
  @DeleteMapping("/vods")
  ResponseEntity<?> deleteVod(@Parameter(description = "추가할 영상 리스트", required = true)
                              @RequestBody List<String> videoIdList) {
    int res = 0;
    try {
      res = adminService.deleteVod(videoIdList);
    } catch(NullPointerException e){
      log.error(e.getMessage());
      return Response.badRequest(e.getMessage());
    } catch (Exception e) {
      log.info(e.getMessage());
    }

    if (res == 0) return Response.notFound("영상 삭제에 실패하였습니다.");
    return Response.ok("영상 삭제에 성공하였습니다.");
  }

  // 영상 등록 API
  @Operation(summary = "영상 등록 API")
  @PostMapping("/vods")
  ResponseEntity<?> insertVod(@Parameter(description = "영상 정보")
                              @RequestBody VodReqDto req) {
    int res = 0;
    try {
      YouTubeDto youtube = youtubeService.get(req.getUrl());

      res = adminService.insertVod(youtube, req.getCategoryId());
    } catch (DataIntegrityViolationException e) {
      log.info(e.getMessage());
      return Response.badRequest("이미 존재하는 영상입니다.");
    } catch (InputMismatchException e) {
      log.info(e.getMessage());
      return Response.badRequest("영상 길이가 13분 이상입니다.");
    } catch (Exception e) {
      log.info(e.getMessage());
    }

    if (res == 0) return Response.notFound("영상 등록에 실패하였습니다.");
    return Response.ok("영상 등록에 성공하였습니다.");
  }

  // 알람 시간 수정 API
  @Operation(summary = "알람 시간 수정 API")
  @PutMapping("/alarm")
  ResponseEntity<?> editSetting(@Parameter(description = "변경할 알람 시간",required = true)
                                @RequestBody SettingReqDto req) {
    int res = 0;
    try {
      res = adminService.editSetting(req);
    } catch (NullPointerException e) {
      log.info(e.getMessage());
      return Response.notFound("초기 세팅이 되어있지 않습니다.");
    } catch (Exception e) {
      log.info(e.getMessage());
    }

    if (res == 0) return Response.badRequest("세팅 수정에 실패하였습니다.");
    return Response.ok("세팅 수정에 성공하였습니다.");
  }

  // 알람 시간 조회 API
  @Operation(summary = "알람 시간 조회 API")
  @GetMapping("/alarm")
  ResponseEntity<?> getSetting() {
    SettingResDto res = null;
    try {
      res = adminService.getSetting();
    } catch (NullPointerException e) {
      log.info(e.getMessage());
      return Response.notFound("초기 세팅이 되어있지 않습니다.");
    } catch (Exception e) {
      log.info(e.getMessage());
    }

    if (res == null) return Response.badRequest("세팅 조회에 실패하였습니다.");
    return Response.makeResponse(HttpStatus.OK, "세팅 조회에 성공했습니다.", 1, res);
  }

  // 건강 문구 삭제 API
  @Operation(summary = "건강 문구 삭제 API")
  @DeleteMapping("/phrase")
  ResponseEntity<?> deletePhrases(@Parameter(description = "삭제할 문구 리스트", required = true)
                                  @RequestBody List<String> phrasesContentList) {
    int res = 0;
    try {
      res = adminService.deletePhrases(phrasesContentList);
    } catch(NullPointerException e){
      log.error(e.getMessage());
      return Response.badRequest("존재하지않는 문구 입니다.");
    } catch (Exception e) {
      log.error(e.getMessage());
    }

    if (res == 0) return Response.notFound("문구 삭제를 실패하였습니다.");
    return Response.ok("문구 삭제를 성공하였습니다.");
  }


}
