package com.ezpz.shabit.goal.service;


import com.ezpz.shabit.goal.dto.req.GoalReqDto;
import com.ezpz.shabit.goal.dto.res.GoalResDto;
import com.ezpz.shabit.goal.entity.Goal;
import com.ezpz.shabit.goal.repository.GoalRepository;
import com.ezpz.shabit.statistics.entity.Daily;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoalServiceImpl implements GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    @Override
    public GoalResDto getGoalData(String email) {
        Users user = userRepository.findByEmail(email).orElse(null);
        if (user == null) throw new NullPointerException("일치하는 유저가 존재하지 않습니다.");

        Goal goal = goalRepository.findGoalByUser(user).orElse(null);
        if (goal == null) {
            log.info("목표가 등록되어있지 않습니다.");
            return GoalResDto.builder().percentage(0).time(0).build();
        }

        return GoalResDto.builder().percentage(goal.getPercentage()).time(goal.getTime()).build();
    }

    @Override
    public GoalResDto putGoalData(String email, GoalReqDto req) {
        Users user = userRepository.findByEmail(email).orElse(null);
        if (user == null) throw new NullPointerException("일치하는 유저가 존재하지 않습니다.");

        Goal goal = goalRepository.findGoalByUser(user).orElse(null);
        if (goal == null) {
            log.info("목표가 등록되어있지 않습니다.");
            goal = Goal.builder().percentage(req.getPercentage()).time(req.getTime()).user(user).build();
            goalRepository.save(goal);

            return GoalResDto.builder().percentage(goal.getPercentage()).time(goal.getTime()).build();
        }

        goal.setGoal(req.getPercentage(), req.getTime());
        return GoalResDto.builder().percentage(goal.getPercentage()).time(goal.getTime()).build();
    }
}
