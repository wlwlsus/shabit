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
  public void changeThema(String email, int thema) throws Exception {
    User user = userRepository.findByEmail(email).orElseThrow();
    user.setThema(thema);
    userRepository.save(user);
  }
}
