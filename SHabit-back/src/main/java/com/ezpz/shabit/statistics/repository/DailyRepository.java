package com.ezpz.shabit.statistics.repository;

import com.ezpz.shabit.statistics.entity.Daily;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DailyRepository extends JpaRepository<Daily, Long> {
}
