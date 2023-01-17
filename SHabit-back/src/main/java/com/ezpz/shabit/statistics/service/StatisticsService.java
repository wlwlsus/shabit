package com.ezpz.shabit.statistics.service;

import com.ezpz.shabit.statistics.entity.Grass;

import java.util.List;

public interface StatisticsService {
    List<Grass> getGrassData(String email);
}
