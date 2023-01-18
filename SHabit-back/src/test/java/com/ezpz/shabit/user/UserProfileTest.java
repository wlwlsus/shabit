package com.ezpz.shabit.user;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import com.ezpz.shabit.user.service.S3FileService;
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
  private MockMvc mockMvc;
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private S3FileService s3FileService;

  @Autowired
  AmazonS3Client amazonS3Client;

  @BeforeEach
  void setUser() throws Exception {
    Users user = Users.builder()
                         .email("dnzma13@naver.com")
                         .build();
    userRepository.save(user);
  }

  @Value("${cloud.aws.s3.bucket}")
  String bucket;

  @Test
  @DisplayName("회원 프로필 사진 수정 성공 Test")
  public void updateProfileSuccessTest() throws Exception {
    // given
    MockMultipartFile file = new MockMultipartFile("놀자에몽", "놀자에몽.png",
            "image/png", new FileInputStream(""));
    // when
    String fileUrl = s3FileService.upload(file, "test");
    S3Object s3Object = amazonS3Client.getObject(new GetObjectRequest(bucket, fileUrl));
    // then
    assertThat(s3Object).isNotNull();
  }

  @Test
  @DisplayName("회원 프로필 사진 수정 성공 API Test")
  public void updateProfileSuccessAPITest() throws Exception {
    // given
    String fileName = "놀자에몽";
    String url = "/api/v1/user/profile/dnzma13@naver.com";
    MockMultipartFile file = new MockMultipartFile("놀자에몽", "놀자에몽.png",
            "image/png", new FileInputStream(""));
    // when
    mockMvc.perform(multipart(url)
                            .file(file).part(new MockPart("id", "foo".getBytes(StandardCharsets.UTF_8))))
            // then
            .andExpect(status().isOk());

  }
}
