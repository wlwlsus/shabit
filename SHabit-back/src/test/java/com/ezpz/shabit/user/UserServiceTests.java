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
  private UserService userService;
  @Autowired
  private EmailService emailService;

  @Test
  @DisplayName("임시 비밀번호 발급 Success Test")
  public void findPasswordSuccess() {
    // given

    // when

    // then

  }

}
