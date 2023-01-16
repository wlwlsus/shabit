package com.ezpz.shabit.user.service;

import com.ezpz.shabit.user.dto.req.UserTestReqDto;
import org.springframework.http.ResponseEntity;

public interface UserService {

    ResponseEntity<?> login(UserTestReqDto.Login login);
}
