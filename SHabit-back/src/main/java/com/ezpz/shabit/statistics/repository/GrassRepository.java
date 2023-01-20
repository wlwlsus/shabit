package com.ezpz.shabit.statistics.repository;

import com.ezpz.shabit.statistics.entity.Grass;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface GrassRepository extends JpaRepository<Grass, Long> {
    List<Grass> findByUserEmailOrderByDateAsc(String email);
}
