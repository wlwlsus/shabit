package com.ezpz.shabit.info.service;

import com.ezpz.shabit.info.dto.res.CategoryResDto;
import com.ezpz.shabit.info.dto.res.VodResDto;

import java.util.List;

public interface InfoService {
  List<VodResDto> getVodList(String email) throws Exception;

  List<CategoryResDto> getCategoryList() throws Exception;
}
