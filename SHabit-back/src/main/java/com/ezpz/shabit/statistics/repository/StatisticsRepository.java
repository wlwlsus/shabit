package com.ezpz.shabit.statistics.repository;

import com.ezpz.shabit.statistics.entity.Statistics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatisticsRepository extends JpaRepository<Statistics, Long> {
}
