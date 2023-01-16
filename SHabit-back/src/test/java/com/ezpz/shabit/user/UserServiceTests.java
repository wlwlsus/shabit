package com.ezpz.shabit.user;

import com.ezpz.shabit.user.entity.User;
import com.ezpz.shabit.user.repository.UserRepository;
import com.ezpz.shabit.user.service.UserService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@Transactional
@AutoConfigureMockMvc
public class UserServiceTests {
  @Autowired
  private MockMvc mockMvc;
  @Autowired
  private UserService userService;
  @Autowired
  private UserRepository userRepository;

  @BeforeEach
  void setUser() {
    User user = User.builder()
                        .email("ssafy@ssafy.com")
                        .nickname("test")
                        .password("1234")
                        .build();

    userRepository.save(user);
    System.out.println("user save successfully");
  }

  @Test
  @DisplayName("이메일 중복 체크 Success Test")
  public void checkEmailSuccessTest() throws Exception {
    // given
    String email = "dnzma13@ssafy.com";
    // when
    boolean isPresent = userService.checkEmail(email);

    // then
    assertThat(isPresent).isFalse();
  }

  @Test
  @DisplayName("이메일 중복 체크 Forbidden Test")
  public void checkEmailForbiddenTest() throws Exception {
    // given
    String email = "ssafy@ssafy.com";
    // when
    User user = userRepository.findByEmail(email).orElseThrow();
    boolean isPresent = userService.checkEmail(email);

    // then
    assertThat(user.getNickname()).isEqualTo("test");
    assertThat(isPresent).isTrue();
  }

  @Test
  @DisplayName("이메일 중복 체크 Success API Test")
  public void checkEmailSuccessApiTest() throws Exception {
    // given
    String url = "/api/v1/user/ssafy1@ssafy.com";
    // when
    mockMvc.perform(MockMvcRequestBuilders.get(url)
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding("UTF-8"))
            // then
            .andExpect(status().isOk());
  }

  @Test
  @DisplayName("이메일 중복 체크 Forbidden API Test")
  public void checkEmailForbiddenApiTest() throws Exception {
    // given
    String url = "/api/v1/user/ssafy@ssafy.com";
    // when
    mockMvc.perform(MockMvcRequestBuilders.get(url)
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding("UTF-8"))
            // then
            .andExpect(status().isForbidden());
  }
}
