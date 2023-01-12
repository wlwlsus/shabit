package com.ezpz.shabit.vod.repository;

import com.ezpz.shabit.vod.entity.Vod;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VodRepository extends JpaRepository<Vod, Long> {
}