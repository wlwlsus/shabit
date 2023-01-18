package com.ezpz.shabit.info.repository;

import com.ezpz.shabit.info.entity.Vod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.SQLException;
import java.util.List;

public interface VodRepository extends JpaRepository<Vod, Long> {
}