package com.ezpz.shabit.user;

import com.ezpz.shabit.jwt.JwtTokenProvider;
import com.ezpz.shabit.user.dto.req.UserTestReqDto;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import com.ezpz.shabit.user.service.UserService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


@Transactional // 로직이 끝난 후 쿼리 초기화
@SpringBootTest
class UsersServiceTest {

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
    Users users = Users.builder()
        .email("ssafy123@gamil.com")
        .nickname("ssafy")
        .password("ssafy!1234")
        .build();

    UserTestReqDto.SignUp signUp = new UserTestReqDto.SignUp();
    signUp.setEmail(users.getEmail());
    signUp.setNickname(users.getNickname());
    signUp.setPassword(users.getPassword());

    // when
    userService.signUp(signUp);

    // then
    Users expectedUsers = userRepository.findUserByEmail(users.getEmail());
    assertThat(expectedUsers.getEmail()).isEqualTo(signUp.getEmail());
  }
}