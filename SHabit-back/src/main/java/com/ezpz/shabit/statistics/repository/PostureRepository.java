package com.ezpz.shabit.statistics.repository;

import com.ezpz.shabit.statistics.entity.Posture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostureRepository extends JpaRepository<Posture, Long> {
    Posture findByName(String 바른_자세);
}
