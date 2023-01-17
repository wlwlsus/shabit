package com.ezpz.shabit.statistics.service;

import com.ezpz.shabit.statistics.entity.Statistics;
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

    @Override
    public List<Statistics> getMonthlyData(String email, int page) {
        Users user = userRepository.findByEmail(email);

        LocalDate today = now();
        LocalDate monthStart = today.minusDays(today.getDayOfMonth()-1); // 오늘 기준 month start
        monthStart = monthStart.minusMonths((-1)*page);

        LocalDate monthEnd = monthStart.withDayOfMonth(monthStart.lengthOfMonth());

        return statisticsRepository.findByUserEmailAndDateBetweenOrderByDateAsc(user.getEmail(), monthStart, monthEnd);
    }

}
