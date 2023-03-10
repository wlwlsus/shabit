package com.ezpz.shabit.statistics.service;

import com.ezpz.shabit.statistics.dto.res.TodayGoalResDto;
import com.ezpz.shabit.statistics.dto.res.TodayPostureTimeResDto;
import com.ezpz.shabit.statistics.entity.Daily;
import com.ezpz.shabit.statistics.entity.Statistics;
import com.ezpz.shabit.statistics.repository.DailyRepository;
import com.ezpz.shabit.statistics.repository.StatisticsRepository;
import com.ezpz.shabit.statistics.entity.Grass;
import com.ezpz.shabit.statistics.repository.GrassRepository;
import com.ezpz.shabit.statistics.dto.req.DailyReqDto;
import com.ezpz.shabit.statistics.entity.Daily;
import com.ezpz.shabit.statistics.repository.DailyRepository;
import com.ezpz.shabit.statistics.entity.Posture;
import com.ezpz.shabit.statistics.repository.PostureRepository;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.List;

import static java.time.LocalDate.now;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {

    private final UserRepository userRepository;
    private final StatisticsRepository statisticsRepository;
    private final DailyRepository dailyRepository;
    private final GrassRepository grassRepository;
    private final PostureRepository postureRepository;

    @Override
    public List<Daily> getTodayData(String email) {
        Users user = userRepository.findByEmail(email).orElse(null);
        if(user == null) throw new NullPointerException("일치하는 유저가 존재하지 않습니다.");

        return dailyRepository.findByUserEmailOrderByStartTimeAsc(user.getEmail());
    }

    @Override
    public List<Grass> getGrassData(String email) {
        Users user = userRepository.findByEmail(email).orElse(null);
        if(user == null) throw new NullPointerException("일치하는 유저가 존재하지 않습니다.");

        return grassRepository.findByUserEmailOrderByDateAsc(user.getEmail());
    }

    @Override
    public List<Statistics> getWeeklyData(String email, int page) {
        Users user = userRepository.findByEmail(email).orElse(null);
        if(user == null) throw new NullPointerException("일치하는 유저가 존재하지 않습니다.");

        LocalDate today = now();
        LocalDate weekStart = today.minusDays(today.getDayOfWeek().getValue()).minusDays(page*(-7));
        LocalDate weekEnd = today.minusDays((today.getDayOfWeek().getValue()-6)).minusDays(page*(-7));

        List<Statistics> res = new ArrayList<>();
        List<Statistics> list = statisticsRepository.findByUserEmailAndDateBetweenOrderByDateAsc(user.getEmail(), weekStart, weekEnd);

        int cursor = 0;
        for(int i=0; i<7; i++){
            LocalDate date = weekStart.plusDays(i);
            if(cursor < list.size() && date.equals(list.get(cursor).getDate())){
                while(cursor < list.size() && date.equals(list.get(cursor).getDate())) {
                    res.add(list.get(cursor));
                    cursor++;
                }
            }else{
                res.add(Statistics.builder().time(0).posture(postureRepository.findById(1L).get()).date(date).user(user).build());
            }
        }
        return res;
    }

    @Override
    public List<Statistics> getMonthlyData(String email, int page) {
        Users user = userRepository.findByEmail(email).orElse(null);
        if(user == null) throw new NullPointerException("일치하는 유저가 존재하지 않습니다.");

        LocalDate today = now();
        LocalDate monthStart = today.minusDays(today.getDayOfMonth()-1); // 오늘 기준 month start
        monthStart = monthStart.minusMonths((-1)*page);

        LocalDate monthEnd = monthStart.withDayOfMonth(monthStart.lengthOfMonth());

        List<Statistics> res = new ArrayList<>();
        List<Statistics> list = statisticsRepository.findByUserEmailAndDateBetweenOrderByDateAsc(user.getEmail(), monthStart, monthEnd);

        int cursor = 0;
        for(int i=0; i<monthStart.lengthOfMonth(); i++){
            LocalDate date = monthStart.plusDays(i);
            if(cursor < list.size() && date.equals(list.get(cursor).getDate())){
                while(cursor < list.size() && date.equals(list.get(cursor).getDate())) {
                    res.add(list.get(cursor));
                    cursor++;
                }
            }else{
                res.add(Statistics.builder().time(0).posture(postureRepository.findById(1L).get()).date(date).user(user).build());
            }
        }
        return res;
    }

    @Override
    public int insertTodayData(List<DailyReqDto> reqDto, String email) {
        Users user = userRepository.findByEmail(email).orElse(null);
        if (user == null) throw new NullPointerException("일치하는 유저가 존재하지 않습니다.");

        List<Daily> data = new ArrayList<>();
        reqDto.forEach(req ->
                data.add(
                        Daily.builder()
                                .startTime(LocalDateTime.parse(req.getStartTime(),
                                        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                                .endTime(LocalDateTime.parse(req.getEndTime(),
                                        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                                .user(userRepository.findByEmail(user.getEmail()).orElse(null))
                                .posture(postureRepository.findById(req.getPostureId()).orElse(null))
                                .build()
                ));

        dailyRepository.saveAll(data);
        return data.size();
    }

    @Override
    public List<Posture> getPostureList() {
        return postureRepository.findAll();
    }

    @Override
    public TodayGoalResDto getTodayGoal(String email) {
        Users user = userRepository.findByEmail(email).orElse(null);
        if (user == null) throw new NullPointerException("일치하는 유저가 존재하지 않습니다.");

        List<Daily> list = dailyRepository.findByUserEmailOrderByStartTimeAsc(user.getEmail());
        long total = 0L;
        long rightPosture = 0L;

        for(Daily data: list){
            Duration duration = Duration.between(data.getStartTime(), data.getEndTime());
            total += duration.getSeconds();
            if(data.getPosture().getPostureId() == 1L){
                rightPosture += duration.getSeconds();
            }
        }

        if(total == 0) return TodayGoalResDto.builder().percentage(0).time(0).build();
        return TodayGoalResDto.builder().percentage((int) ((100*rightPosture)/total)).time((int) (rightPosture/60)).build();
    }

    @Override
    public TodayPostureTimeResDto getTodayPostureTime(String email) {
        Users user = userRepository.findByEmail(email).orElse(null);
        if (user == null) throw new NullPointerException("일치하는 유저가 존재하지 않습니다.");

        List<Daily> list = dailyRepository.findByUserEmailOrderByStartTimeAsc(user.getEmail());
        long total = 0L;
        Long[] seconds = {0L, 0L, 0L, 0L};

        for(Daily data: list){
            Duration duration = Duration.between(data.getStartTime(), data.getEndTime());
            total += duration.getSeconds();
            seconds[(int) (data.getPosture().getPostureId() - 1)] += duration.getSeconds();
        }

        TodayPostureTimeResDto res = TodayPostureTimeResDto.builder().build();
        res.setTotal(total/60);
        res.setTime(List.of((int) (seconds[0]/60), (int) (seconds[1]/60), (int) (seconds[2]/60), (int) (seconds[3]/60)));

        return res;
    }

}
