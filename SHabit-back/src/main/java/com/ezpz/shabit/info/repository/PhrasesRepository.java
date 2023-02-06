package com.ezpz.shabit.info.repository;

import com.ezpz.shabit.info.entity.Phrases;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhrasesRepository extends JpaRepository<Phrases, Long> {
    Phrases findByContent(String content);
    Page<Phrases> findAll(Pageable pageable);
    void deleteByContent(String content);
}