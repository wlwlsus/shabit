package com.ezpz.shabit.user.service;

import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
  private final UserRepository userRepository;

  @Override
  public void updateNickname(String email, String nickname) throws Exception {
    log.info("email : {}, nickname : {}", email, nickname);
    Users user = userRepository.findByEmail(email).orElseThrow();
    log.info("before update user : {}", user);
    user.setNickname(nickname);
    userRepository.save(user);
    log.info("after update user : {}", user);
  }
}
