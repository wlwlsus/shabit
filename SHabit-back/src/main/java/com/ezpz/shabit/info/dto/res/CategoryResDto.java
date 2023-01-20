package com.ezpz.shabit.info.dto.res;

import com.ezpz.shabit.info.entity.Category;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CategoryResDto {
  private Long categoryId;
  private String name;

  public CategoryResDto(Category category) {
    this.categoryId = category.getCategoryId();
    this.name = category.getName();
  }

}