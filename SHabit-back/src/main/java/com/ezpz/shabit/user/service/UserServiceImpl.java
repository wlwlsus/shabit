package com.ezpz.shabit.user.service;

import com.ezpz.shabit.user.entity.User;
import com.ezpz.shabit.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  @Override
  @Transactional
  public void updatePassword(String email, String password) throws Exception {
    log.info("email : {}, password : {}", email, password);
    User user = userRepository.findByEmail(email).orElseThrow();
    log.info("before user : {}", user);

    user.setPassword(password);
    userRepository.save(user);
    log.info("after user : {}", user);
  }
}
