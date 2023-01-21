package com.ezpz.shabit.user;

import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import com.ezpz.shabit.user.service.EmailService;
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

import java.util.NoSuchElementException;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
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
  @Autowired
  private EmailService emailService;

  @BeforeEach
  void setUser() {
    Users user = Users.builder()
                        .nickname("genie")
                        .password("1234")
                        .email("dnzma13@gmail.com")
                        .build();
    userRepository.save(user);
  }

  @Test
  @Transactional
  @DisplayName("임시 비밀번호 발급 Success Test")
  public void findPasswordSuccessTest() throws Exception {
    // given
    String email = "dnzma13@gmail.com";
    // when
    String code = emailService.sendFindPasswordEmail(email);
    userService.updatePassword(email, code);
    // then
    Optional<Users> user = userRepository.findByEmail(email);
    assertThat(user.isPresent()).isTrue();
    assertThat(user.orElseThrow().getPassword()).isEqualTo(code);
  }

  @Test
  @DisplayName("임시 비밀번호 발급 Fail Test")
  public void findPasswordFailTest() throws Exception {
    // given
    String email = "dnzma13@ssafy.com";
    // when
    String code = emailService.sendFindPasswordEmail(email);
    // then
    assertThatThrownBy(() -> userService.updatePassword(email, code)).isInstanceOf(NoSuchElementException.class);
  }

  @Test
  @DisplayName("임시 비밀번호 발급 API Success Test")
  public void findPasswordAPISuccessTest() throws Exception {
    // given
    String url = "/api/v1/user/dnzma13@gmail.com";
    // when
    mockMvc.perform(MockMvcRequestBuilders.put(url)
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding("UTF-8"))
            // then
            .andExpect(status().isOk());

  }

  @Test
  @DisplayName("임시 비밀번호 발급 API NoContent Test")
  public void findPasswordAPINoContentTest() throws Exception {
    // given
    String url = "/api/v1/user/dnzma13@ssafy.com";
    // when
    mockMvc.perform(MockMvcRequestBuilders.put(url)
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding("UTF-8"))
            // then
            .andExpect(status().isNoContent());

  }
}
