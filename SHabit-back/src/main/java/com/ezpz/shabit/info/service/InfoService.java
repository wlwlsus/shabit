package com.ezpz.shabit.info.service;

import com.ezpz.shabit.info.dto.res.CategoryResDto;
import com.ezpz.shabit.info.dto.res.PhrasesResDto;
import com.ezpz.shabit.info.dto.res.VodResDto;

import java.util.List;

public interface InfoService {

  List<CategoryResDto> getCategoryList() throws Exception;

  public PhrasesResDto getPhrase() throws Exception;

  List<VodResDto> getVodList(String email) throws Exception;
}
