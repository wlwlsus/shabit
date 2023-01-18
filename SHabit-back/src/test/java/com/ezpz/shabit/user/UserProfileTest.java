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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockPart;
import org.springframework.test.web.servlet.MockMvc;

import java.io.FileInputStream;
import java.nio.charset.StandardCharsets;

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
    // then
//    S3Object s3Object = amazonS3Client.getObject(new GetObjectRequest(bucket, fileUrl));

  }
}
