package com.ezpz.shabit.user.repository;

import com.ezpz.shabit.user.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Long> {
}
