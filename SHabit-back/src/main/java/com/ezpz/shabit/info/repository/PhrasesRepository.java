package com.ezpz.shabit.info.repository;

import com.ezpz.shabit.info.entity.Phrases;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhrasesRepository extends JpaRepository<Phrases, Long> {
    Phrases findByContent(String content);
}