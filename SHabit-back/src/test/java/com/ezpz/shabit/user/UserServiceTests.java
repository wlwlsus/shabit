package com.ezpz.shabit.user;

import com.ezpz.shabit.user.entity.User;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@Transactional
@AutoConfigureMockMvc
public class UserServiceTests {
  @Autowired
  private MockMvc mockMvc;
  @Autowired
  private EmailService emailService;

  @Test
  @DisplayName("이메일 인증 Success Test")
  public void certifyEmailSuccessTest() throws Exception {
    // given
    String email = "dnzma13@naver.com";
    // when
    String code = emailService.sendCertificationEmail(email);
    //then
    assertThat(code).isNotEmpty();
  }

  @Test
  @DisplayName("이메일 인증 API Test")
  public void certifyEmailSuccessAPITest() throws Exception {
    // given
    String url = "/api/v1/email/dnzma13@naver.com";
    // when
    mockMvc.perform(MockMvcRequestBuilders.get(url)
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding("UTF-8"))
            // then
            .andExpect(status().isOk());
  }

}
