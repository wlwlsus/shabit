package com.ezpz.shabit.user.repository;

import com.ezpz.shabit.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

  User findUserByEmail(String email);

  Optional<User> findByEmail(String email);

  boolean existsByEmail(String email);
}
