package com.ezpz.shabit.user.repository;

import com.ezpz.shabit.user.dto.req.UserTestReqDto;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.service.UserService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


@SpringBootTest
@Transactional
class UsersRepositoryTest {

  @Autowired
  UserRepository userRepository;

  @Autowired
  UserService userService;


  @Test
  @DisplayName("이메일로_회원객체_확인")
  void 이메일로_회원객체_확인() {
    // given
    UserTestReqDto.SignUp sign = new UserTestReqDto.SignUp();
    sign.setEmail("ssafy123@gmail.com");
    sign.setNickname("ssafy");
    sign.setPassword("ssafy!1234");
    userService.signUp(sign);

    // when
    String email = "ssafy123@gmail.com";
    Users users = userRepository.findUserByEmail(email);

    // then
    assertThat(users.getNickname()).isEqualTo("ssafy");
  }

  @Test
  @DisplayName("회원가입하지_않은_이메일_확인")
  void 회원가입하지_않은_이메일_확인() {
    // given
    String email = "zzz@gmail.com";

    // when
    Optional<Users> user = userRepository.findByEmail(email);

    // then
    assertThat(user).isEqualTo(Optional.empty());
  }

  @Test
  @DisplayName("이메일_회원가입_중복체크")
  void 이메일_회원가입_중복체크() {
    // given
    UserTestReqDto.SignUp sign = new UserTestReqDto.SignUp();
    sign.setEmail("ssafy123@gmail.com");
    sign.setNickname("ssafy");
    sign.setPassword("ssafy!1234");
    userService.signUp(sign);

    // when
    Boolean flag = userRepository.existsByEmail(sign.getEmail());

    // then
    assertThat(flag).isEqualTo(true);
  }

  @Test
  @DisplayName("없는_이메일_회원가입_중복체크")
  void 없는_이메일_회원가입_중복체크() {
    // given
    String email = "asd111@gmail.com";

    // when
    Boolean flag = userRepository.existsByEmail(email);

    // then
    assertThat(flag).isEqualTo(false);
  }
}