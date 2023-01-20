package com.ezpz.shabit.user.service;

import com.ezpz.shabit.user.dto.req.UserTestReqDto;
import org.springframework.http.ResponseEntity;

public interface UserService {
  ResponseEntity<?> signUp(UserTestReqDto.SignUp signUp);

  ResponseEntity<?> login(UserTestReqDto.Login login);

  ResponseEntity<?> logout(UserTestReqDto.Logout logout);

  ResponseEntity<?> reissue(UserTestReqDto.Reissue reissue);

  ResponseEntity<?> getUserInfo(String email);

  void changeTheme(String email, int thema) throws Exception;
  void updateNickname(String email, String nickname) throws Exception;

  void deleteProfile(String email) throws Exception;
}
