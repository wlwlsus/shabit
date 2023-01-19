package com.ezpz.shabit.info.repository;

import com.ezpz.shabit.info.entity.Vod;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VodRepository extends JpaRepository<Vod, Long> {
    Vod findByVideoId(String videoId);
}