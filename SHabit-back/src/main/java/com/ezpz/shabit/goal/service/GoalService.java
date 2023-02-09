package com.ezpz.shabit.goal.service;

import com.ezpz.shabit.goal.dto.req.GoalReqDto;
import com.ezpz.shabit.goal.dto.res.GoalResDto;
import com.ezpz.shabit.goal.entity.Goal;
import com.ezpz.shabit.user.entity.Users;

public interface GoalService {
    GoalResDto getGoalData(String email);
    GoalResDto putGoalData(String email, GoalReqDto req);
}
