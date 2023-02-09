package com.ezpz.shabit.goal.repository;

import com.ezpz.shabit.goal.entity.Goal;
import com.ezpz.shabit.user.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GoalRepository extends JpaRepository<Goal, Long> {
    Optional<Goal> findGoalByUser(Users user);
}
