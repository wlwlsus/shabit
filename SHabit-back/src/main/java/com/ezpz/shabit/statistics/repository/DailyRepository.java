package com.ezpz.shabit.statistics.repository;

import com.ezpz.shabit.statistics.entity.Daily;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.SQLException;
import java.util.List;

public interface DailyRepository extends JpaRepository<Daily, Long> {
  List<Daily> findByUserEmailOrderByEndTime(String email) throws SQLException;
}
