package com.ezpz.shabit.admin.repository;

import com.ezpz.shabit.admin.entity.Setting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SettingRepository extends JpaRepository<Setting, Long> {
}
