package com.ezpz.shabit.user.service;

import com.ezpz.shabit.jwt.JwtTokenProvider;
import com.ezpz.shabit.user.dto.req.UserTestReqDto;
import com.ezpz.shabit.user.dto.res.UserTestResDto;
import com.ezpz.shabit.user.repository.UserRepository;
import com.ezpz.shabit.util.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final JwtTokenProvider jwtTokenProvider;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Override
    public ResponseEntity<?> login(UserTestReqDto.Login login) {

        if (userRepository.findByEmail(login.getEmail()).orElse(null) == null) {
            return Response.badRequest("해당하는 유저가 존재하지 않습니다.");
        }

        UsernamePasswordAuthenticationToken authenticationToken = login.toAuthentication();

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        UserTestResDto.TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

        return Response.makeResponse(HttpStatus.OK, "로그인에 성공했습니다.", 0, tokenInfo);
    }
}
