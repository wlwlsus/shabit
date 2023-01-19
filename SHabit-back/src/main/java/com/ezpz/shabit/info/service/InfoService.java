package com.ezpz.shabit.info.service;

import com.ezpz.shabit.info.dto.CategoryResDto;
import org.springframework.stereotype.Service;

import java.util.List;

public interface InfoService {
  List<CategoryResDto> getCategoryList() throws Exception;
}
