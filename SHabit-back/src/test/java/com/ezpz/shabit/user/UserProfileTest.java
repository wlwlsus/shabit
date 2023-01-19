package com.ezpz.shabit.user;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import com.ezpz.shabit.user.service.S3FileService;
import com.ezpz.shabit.user.service.UserService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockPart;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.io.FileInputStream;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
public class UserProfileTest {
  @Autowired
  MockMvc mockMvc;
  @Autowired
  S3FileService s3FileService;
  @Autowired
  UserService userService;
  @Autowired
  UserRepository userRepository;

  @Value("${cloud.aws.s3.bucket}")
  String bucket;
  @Value("${user.profile}")
  String defaultUrl;

  @BeforeEach
  public void setUser() {
    Users user = Users.builder()
                         .email("ssafy1@ssafy.com")
                         .profile("")
                         .build();
    userRepository.save(user);
    System.out.println("user saved successfully");
  }

  @Test
  @Transactional
  @DisplayName("프로필 사진 삭제 성공 Test")
  public void deleteProfileSuccessTest() throws Exception {
    // given
    String email = "ssafy1@ssafy.com";
    // when
    Users user = userRepository.findByEmail(email).orElseThrow();
    String fileUrl = user.getProfile();
    userService.deleteProfile(email);
    user = userRepository.findByEmail(email).orElseThrow();
    // then
    assertThat(user.getProfile()).isEqualTo(defaultUrl);
  }

  @Test
  @Transactional
  @DisplayName("프로필 사진 삭제 실패 Test")
  public void deleteProfileNoContentTest() throws Exception {
    // given
    String email = "ssafy2@ssafy.com";
    // when
    Optional<Users> user = userRepository.findByEmail(email);
    // then
    assertThat(user).isNull();
  }

  @Test
  @Transactional
  @DisplayName("프로필 사진 삭제 API Success Test")
  public void deleteProfileAPISuccessTest() throws Exception {
    // given
    String url = "api/v1/user/profile/ssafy1@ssafy.com";
    // when
    mockMvc.perform(MockMvcRequestBuilders.delete(url)
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding("UTF-8"))
            // then
            .andExpect(status().isOk());
  }

  @Test
  @Transactional
  @DisplayName("프로필 사진 삭제 API NoContent Test")
  public void deleteProfileAPINoContentTest() throws Exception {
    // given
    String url = "api/v1/user/profile/ssafy2@ssafy.com";
    // when
    mockMvc.perform(MockMvcRequestBuilders.delete(url)
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding("UTF-8"))
            // then
            .andExpect(status().isNoContent());
  }
}
