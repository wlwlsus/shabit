package com.ezpz.shabit.user.service;


import com.ezpz.shabit.config.oauth.entity.UserPrincipal;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * author : cadqe13@gmail.com
 * date : 2023-01-17
 * description :
 */

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userRepository.findByEmail(username)
        .map(this::createUserDetails)
        .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
  }

  // 해당하는 User 의 데이터가 존재한다면 UserDetails 객체로 만들어서 리턴
  private UserDetails createUserDetails(Users users) {
//    return new User(users.getEmail(), users.getPassword(), users.getAuthorities());
    return UserPrincipal.create(users);
  }
}
