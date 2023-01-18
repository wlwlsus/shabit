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
  public void updateProfile(String email, String url) throws Exception {
    Users user = userRepository.findByEmail(email).orElseThrow();
    user.setProfile(url);
    userRepository.save(user);
  }
}
