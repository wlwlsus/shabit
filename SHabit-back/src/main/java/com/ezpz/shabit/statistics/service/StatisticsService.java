package com.ezpz.shabit.statistics.service;

import com.ezpz.shabit.statistics.dto.req.DailyReqDto;

import java.util.List;

public interface StatisticsService {
    int insertTodayData(List<DailyReqDto> data, String email);
}
