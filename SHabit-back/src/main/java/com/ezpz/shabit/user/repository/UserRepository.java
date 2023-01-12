package com.ezpz.shabit.user.repository;

import com.ezpz.shabit.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
