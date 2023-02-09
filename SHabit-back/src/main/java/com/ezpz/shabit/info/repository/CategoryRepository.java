package com.ezpz.shabit.info.repository;

import com.ezpz.shabit.info.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
