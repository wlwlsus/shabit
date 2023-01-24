package com.ezpz.shabit.info.service;

import com.ezpz.shabit.info.dto.res.CategoryResDto;
import com.ezpz.shabit.info.dto.res.PhrasesResDto;
import com.ezpz.shabit.info.dto.res.VodResDto;

import java.util.List;

public interface InfoService {
  public List<VodResDto> getVodList() throws Exception;
  List<CategoryResDto> getCategoryList() throws Exception;
  public PhrasesResDto getPhrase() throws Exception;
}
