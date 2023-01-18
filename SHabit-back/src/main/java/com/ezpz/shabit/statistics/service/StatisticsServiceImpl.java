package com.ezpz.shabit.statistics.service;

import com.ezpz.shabit.statistics.entity.Posture;
import com.ezpz.shabit.statistics.repository.PostureRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {

    private final PostureRepository postureRepository;

    @Override
    public List<Posture> getPostureList() {
        return postureRepository.findAll();
    }
}
