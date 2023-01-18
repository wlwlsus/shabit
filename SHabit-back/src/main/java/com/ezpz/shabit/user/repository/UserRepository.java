package com.ezpz.shabit.user.repository;

import com.ezpz.shabit.user.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.SQLException;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
  Optional<Users> findByEmail(String email) throws SQLException;
}
