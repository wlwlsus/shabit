package com.ezpz.shabit.user.service;

import com.ezpz.shabit.jwt.JwtTokenProvider;
import com.ezpz.shabit.user.dto.req.UserTestReqDto;
import com.ezpz.shabit.user.entity.User;
import com.ezpz.shabit.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


@Transactional // 로직이 끝난 후 쿼리 초기화
@SpringBootTest
class UserServiceTest {

  @Autowired
  UserService userService;
  @Autowired
  UserRepository userRepository;

  @Autowired
  JwtTokenProvider jwtTokenProvider;

  @Test
  @DisplayName("회원가입_서비스")
  void 회원가입_서비스() {
    // given
    // 유저 객체 생성
    User user = User.builder()
        .email("ssafy123@gamil.com")
        .nickname("ssafy")
        .password("ssafy!1234")
        .build();

    UserTestReqDto.SignUp signUp = new UserTestReqDto.SignUp();
    signUp.setEmail(user.getEmail());
    signUp.setNickname(user.getNickname());
    signUp.setPassword(user.getPassword());

    // when
    userService.signUp(signUp);

    // then
    User expectedUser = userRepository.findUserByEmail(user.getEmail());
    assertThat(expectedUser.getEmail()).isEqualTo(signUp.getEmail());
  }
}