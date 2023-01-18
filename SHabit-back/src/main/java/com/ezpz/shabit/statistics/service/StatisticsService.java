package com.ezpz.shabit.statistics.service;

import com.ezpz.shabit.statistics.dto.req.DailyReqDto;
import com.ezpz.shabit.statistics.entity.Posture;

import java.util.List;

public interface StatisticsService {
    List<Posture> getPostureList();
}
