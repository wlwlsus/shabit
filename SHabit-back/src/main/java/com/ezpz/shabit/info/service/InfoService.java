package com.ezpz.shabit.info.service;

import com.ezpz.shabit.info.dto.res.CategoryResDto;

import java.util.List;

public interface InfoService {
  List<CategoryResDto> getCategoryList() throws Exception;
}
