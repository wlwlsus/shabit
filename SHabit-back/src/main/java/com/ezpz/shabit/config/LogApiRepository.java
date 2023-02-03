package com.ezpz.shabit.config;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LogApiRepository extends MongoRepository<LogApiDao, String> {
    Page<LogApiDao> findByTimeBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);

    Page<LogApiDao> findByLogContainingAndTimeBetween(String search, LocalDateTime start, LocalDateTime end, Pageable pageable);
}