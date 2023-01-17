package com.ezpz.shabit.statistics.service;

import com.ezpz.shabit.statistics.dto.req.DailyReqDto;
import com.ezpz.shabit.statistics.entity.Daily;
import com.ezpz.shabit.statistics.repository.DailyRepository;
import com.ezpz.shabit.statistics.repository.PostureRepository;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {

    private final DailyRepository dailyRepository;
    private final PostureRepository postureRepository;
    private final UserRepository userRepository;

    @Override
    public int insertTodayData(List<DailyReqDto> reqDto, String email) {
        Users user = userRepository.findByEmail(email);

        List<Daily> data = new ArrayList<>();
        reqDto.forEach(req ->
                data.add(
                        Daily.builder()
                                .startTime(LocalDateTime.parse(req.getStartTime(),
                                        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                                .endTime(LocalDateTime.parse(req.getEndTime(),
                                        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                                .user(userRepository.findByEmail(user.getEmail()))
                                .posture(postureRepository.findByName(req.getPosture()))
                                .build()
                ));

        dailyRepository.saveAll(data);
        return data.size();
    }
}
