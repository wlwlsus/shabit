package com.ezpz.shabit.statistics.service;

import com.ezpz.shabit.statistics.entity.Statistics;

import java.util.List;

public interface StatisticsService {
    List<Statistics> getMonthlyData(String email, int page);
}
