package com.ezpz.shabit.goal.repository;

import com.ezpz.shabit.goal.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalRepository extends JpaRepository<Goal, Long> {
}
