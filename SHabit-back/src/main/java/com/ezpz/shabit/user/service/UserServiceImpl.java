package com.ezpz.shabit.user.service;

import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  private final S3FileService s3FileService;

  @Override
  @Transactional
  public void deleteProfile(String email) throws Exception {
    // 회원 정보 가져오기
    Users user = userRepository.findByEmail(email).orElseThrow();
    log.info("user nickname : {}", user.getNickname());
    // 프로필 사진 url 가져오기
    String fileUrl = user.getProfile();
    log.info("fileUrl in S3: {}", fileUrl);
    // S3에서 삭제하기
    s3FileService.delete(fileUrl);
    log.info("file deletion success in userService");
    // DB 프로필 사진 삭제하기
    user.setProfile(null);
    userRepository.save(user);
  }
}
