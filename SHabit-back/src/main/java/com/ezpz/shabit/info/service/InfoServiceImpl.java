package com.ezpz.shabit.info.service;

import com.ezpz.shabit.info.dto.CategoryResDto;
import com.ezpz.shabit.info.entity.Category;
import com.ezpz.shabit.info.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class InfoServiceImpl implements InfoService {
  private final CategoryRepository categoryRepository;

  @Override
  public List<CategoryResDto> getCategoryList() throws Exception {
    List<Category> list = categoryRepository.findAll();
    log.info("list in service : {}", list);
    List<CategoryResDto> result = list.stream().map((CategoryResDto::new)).toList();
    return result;
  }
}
