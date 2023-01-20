package com.ezpz.shabit.statistics.service;

import com.ezpz.shabit.statistics.entity.Daily;
import com.ezpz.shabit.statistics.repository.DailyRepository;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {

    private final UserRepository userRepository;
    private final DailyRepository dailyRepository;

    @Override
    public List<Daily> getTodayData(String email) {
        Users user = userRepository.findByEmail(email);

        return dailyRepository.findByUserEmailOrderByStartTimeAsc(user.getEmail());
    }

}
