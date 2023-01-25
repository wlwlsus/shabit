package com.ezpz.shabit.user;

import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import com.ezpz.shabit.user.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
public class UserServiceNicknameTest {
  @Autowired
  MockMvc mockMvc;

  @Autowired
  UserService userService;

  @Autowired
  UserRepository userRepository;

  private final String email = "ssafy@ssafy.com";

  @BeforeEach
  void setUser() {
    Users user = Users.builder()
                         .email(email)
                         .nickname("ssafy")
                         .password("1234")
                         .build();
    userRepository.save(user);
  }

  @Test
  @DisplayName("닉네임 변경 성공 Test")
  public void updateNicknameSuccessTest() throws Exception {
    // given
    String expected = "test";
    // when
    userService.updateNickname(email, "test");
    Users user = userRepository.findByEmail(email).orElseThrow();
    // then
    assertThat(user.getNickname()).isEqualTo(expected);
  }

  @Test
  @DisplayName("닉네임 변경 API 성공 Test")
  public void updateNicknameAPISuccessTest() throws Exception {
    // given
    String url = "/api/v1/user/nickname/" + email;
    String expected = "test";

    Map<String, String> json = new HashMap<>();
    json.put("nickname", expected);
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
  @DisplayName("닉네임 변경 API 실패 Test")
  public void updateNicknameAPINoConentTest() throws Exception {
    // given
    String url = "/api/v1/user/nickname/ssafy2@ssafy.com";
    String expected = "test";

    Map<String, String> json = new HashMap<>();
    json.put("nickname", expected);
    ObjectMapper mapper = new ObjectMapper();
    // when
    mockMvc.perform(MockMvcRequestBuilders.put(url)
                            .content(mapper.writeValueAsString(json))
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding("UTF-8"))
            // then
            .andExpect(status().isNoContent());
  }
}
