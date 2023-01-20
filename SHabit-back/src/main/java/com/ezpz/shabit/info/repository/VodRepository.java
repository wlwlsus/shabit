package com.ezpz.shabit.info.repository;

import com.ezpz.shabit.info.entity.Vod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VodRepository extends JpaRepository<Vod, Long> {
    List<Vod> findByTitleIsLike(String name);
    List<Vod> findByLength(int length);
    List<Vod> findByCategoryName(String categoryName);
    Vod findByVideoId(String videoId);
}