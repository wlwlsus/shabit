package com.ezpz.shabit.statistics.repository;

import com.ezpz.shabit.statistics.entity.Statistics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface StatisticsRepository extends JpaRepository<Statistics, Long> {
    List<Statistics> findByUserEmailAndDateBetweenOrderByDateAsc(String email, LocalDate startDate, LocalDate endDate);
}
