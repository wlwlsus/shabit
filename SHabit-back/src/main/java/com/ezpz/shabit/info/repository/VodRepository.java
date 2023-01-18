package com.ezpz.shabit.info.repository;

import com.ezpz.shabit.info.entity.Vod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VodRepository extends JpaRepository<Vod, Long> {
    List<Vod> findByCategory(String category);

    List<Vod> findByNameIsLike(String name);
    List<Vod> findByLength(int length);
}