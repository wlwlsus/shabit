package com.ezpz.shabit.statistics.service;

import com.ezpz.shabit.statistics.entity.Daily;

import java.util.List;

public interface StatisticsService {
    List<Daily> getTodayData(String email);
}
