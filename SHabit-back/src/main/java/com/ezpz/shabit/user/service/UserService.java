package com.ezpz.shabit.user.service;

import com.ezpz.shabit.user.dto.req.UserTestReqDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

  boolean checkEmail(String email) throws Exception;

  ResponseEntity<?> signUp(UserTestReqDto.SignUp signUp);

  ResponseEntity<?> login(UserTestReqDto.Login login);

  ResponseEntity<?> logout(UserTestReqDto.Logout logout);

  ResponseEntity<?> reissue(UserTestReqDto.Reissue reissue);

  ResponseEntity<?> getUserInfo(String email);

  void updatePassword(String email, String password) throws Exception;

  void updateNickname(String email, String nickname) throws Exception;

  void changeThema(String email, int thema) throws Exception;

  boolean changePassword(String email, String curPassword, String changePassword) throws Exception;

  String updateProfile(String email, MultipartFile profile) throws Exception;

  void deleteProfile(String email) throws Exception;

  void addPostureImage(String email, MultipartFile image) throws Exception;
}
