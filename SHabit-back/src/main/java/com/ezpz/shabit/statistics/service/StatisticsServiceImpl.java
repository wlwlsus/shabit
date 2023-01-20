package com.ezpz.shabit.statistics.service;

import com.ezpz.shabit.statistics.entity.Daily;
import com.ezpz.shabit.statistics.entity.Statistics;
import com.ezpz.shabit.statistics.repository.DailyRepository;
import com.ezpz.shabit.statistics.repository.StatisticsRepository;
import com.ezpz.shabit.statistics.entity.Grass;
import com.ezpz.shabit.statistics.repository.GrassRepository;
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
    private final GrassRepository grassRepository;


    @Override
    public List<Daily> getTodayData(String email) {
        Users user = userRepository.findByEmail(email).orElse(null);

        return dailyRepository.findByUserEmailOrderByStartTimeAsc(user.getEmail());
    }

    @Override
    public List<Grass> getGrassData(String email) {
        Users user = userRepository.findByEmail(email).orElse(null);

        return grassRepository.findByUserEmailOrderByDateAsc(user.getEmail());
    }

    @Override
    public List<Statistics> getWeeklyData(String email, int page) {
        Users user = userRepository.findByEmail(email).orElse(null);
        if(user == null) throw new NullPointerException("일치하는 유저가 존재하지 않습니다.");

        LocalDate today = now();
        LocalDate weekStart = today.minusDays(today.getDayOfWeek().getValue()).minusDays(page*(-7));
        LocalDate weekEnd = today.minusDays((today.getDayOfWeek().getValue()-6)).minusDays(page*(-7));

        return statisticsRepository.findByUserEmailAndDateBetweenOrderByDateAsc(user.getEmail(), weekStart, weekEnd);
    }

    @Override
    public List<Statistics> getMonthlyData(String email, int page) {
        Users user = userRepository.findByEmail(email).orElse(null);

        LocalDate today = now();
        LocalDate monthStart = today.minusDays(today.getDayOfMonth()-1); // 오늘 기준 month start
        monthStart = monthStart.minusMonths((-1)*page);

        LocalDate monthEnd = monthStart.withDayOfMonth(monthStart.lengthOfMonth());

        return statisticsRepository.findByUserEmailAndDateBetweenOrderByDateAsc(user.getEmail(), monthStart, monthEnd);
    }


}
