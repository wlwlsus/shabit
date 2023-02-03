package com.ezpz.shabit.user;

import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import com.ezpz.shabit.user.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserServicePasswordTest {
  @Autowired
  UserService userService;
  @Autowired
  UserRepository userRepository;
  @Autowired
  MockMvc mockMvc;

  @Autowired
  PasswordEncoder passwordEncoder;

  final String email = "ssafy@ssafy.com";

  @BeforeEach
  void setUser() {
    Users user = Users.builder()
                         .email(email)
                         .nickname("ssafy")
                         .password(passwordEncoder.encode("1234"))
                         .build();
    userRepository.save(user);
  }

  @Test
  @Transactional
  @DisplayName("비밀번호 변경 성공 Test")
  void changePasswordSuccessTest() throws Exception {
    // given
    String inputEmail = "ssafy@ssafy.com";
    String curPassword = "1234";
    String changePassword = "2345";
    // when
    boolean isSame = userService.changePassword(inputEmail, curPassword, changePassword);
    final Users user = userRepository.findByEmail(inputEmail).orElseThrow();
    // then
    assertThat(isSame).isTrue();
    assertThat(passwordEncoder.matches(changePassword, user.getPassword())).isTrue();
  }

  @Test
  @Transactional
  @DisplayName("비밀번호 변경 실패 Test")
  void changePasswordFailTest() throws Exception {
    // given
    String inputEmail = "ssafy@ssafy.com";
    String curPassword = "12344";
    String changePassword = "2345";
    // when

    // then
    assertThat(userService.changePassword(email, curPassword, changePassword)).isFalse();
  }

  @Test
  @Transactional
  @DisplayName("비밀번호 변경 API 성공 Test")
  void changePasswordAPISuccessTest() throws Exception {
    // given
    String inputEmail = "ssafy@ssafy.com";
    String url = "/api/v1/user/password-change/" + inputEmail;
    Map<String, String> json = new HashMap<>();
    String curPassword = "1234";
    String changePassword = "2345";
    json.put("curPassword", curPassword);
    json.put("changePassword", changePassword);
    ObjectMapper mapper = new ObjectMapper();
    // when
    mockMvc.perform(MockMvcRequestBuilders.put(url)
                            .content(mapper.writeValueAsString(json))
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding("UTF-8"))
            // then
            .andExpect(status().isOk());
  }

  @Test
  @Transactional
  @DisplayName("비밀번호 변경 API 실패 Test")
  void changePasswordAPIFailTest() throws Exception {
    // given
    String inputEmail = "ssafy@ssafy.com";
    String url = "/api/v1/user/password-change/" + inputEmail;
    Map<String, String> json = new HashMap<>();
    String curPassword = "12346";
    String changePassword = "2345";
    json.put("curPassword", curPassword);
    json.put("changePassword", changePassword);
    ObjectMapper mapper = new ObjectMapper();
    // when
    mockMvc.perform(MockMvcRequestBuilders.put(url)
                            .content(mapper.writeValueAsString(json))
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding("UTF-8"))
            // then
            .andExpect(status().isBadRequest());
  }
}
