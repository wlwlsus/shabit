package com.ezpz.shabit.statistics.service;

import com.ezpz.shabit.statistics.entity.Daily;
import com.ezpz.shabit.statistics.entity.Statistics;
import com.ezpz.shabit.statistics.repository.DailyRepository;
import com.ezpz.shabit.statistics.repository.StatisticsRepository;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

import static java.time.LocalDate.now;

@Service
@Slf4j
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {

    private final UserRepository userRepository;
    private final StatisticsRepository statisticsRepository;
    private final DailyRepository dailyRepository;

    @Override
    public List<Daily> getTodayData(String email) {
        Users user = userRepository.findByEmail(email).get();

        return dailyRepository.findByUserEmailOrderByStartTimeAsc(user.getEmail());
    }

    @Override
    public List<Statistics> getWeeklyData(String email, int page) {
        Users user = userRepository.findByEmail(email).get();

        LocalDate today = now();
        LocalDate weekStart = today.minusDays(today.getDayOfWeek().getValue()).minusDays(page*(-7));
        LocalDate weekEnd = today.minusDays((today.getDayOfWeek().getValue()-6)).minusDays(page*(-7));

        return statisticsRepository.findByUserEmailAndDateBetweenOrderByDateAsc(user.getEmail(), weekStart, weekEnd);
    }



}
