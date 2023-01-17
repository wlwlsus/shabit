package com.ezpz.shabit.user.service;

import com.ezpz.shabit.jwt.JwtTokenProvider;
import com.ezpz.shabit.user.dto.req.UserTestReqDto;
import com.ezpz.shabit.user.dto.res.UserTestResDto;
import com.ezpz.shabit.user.entity.User;
import com.ezpz.shabit.user.repository.UserRepository;
import com.ezpz.shabit.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;

	private final PasswordEncoder passwordEncoder;

	private final JwtTokenProvider jwtTokenProvider;

	private final AuthenticationManagerBuilder authenticationManagerBuilder;

	private final RedisTemplate redisTemplate;

	@Override
	public ResponseEntity<?> signUp(UserTestReqDto.SignUp signUp) {
		if (userRepository.existsByEmail(signUp.getEmail())) {
			return Response.badRequest("이미 회원가입된 이메일입니다.");
		}

		User user = User.builder()
						.email(signUp.getEmail())
						.nickname(signUp.getNickname())
						.password(passwordEncoder.encode(signUp.getPassword()))
						.build();

		userRepository.save(user);

		return Response.ok("회원가입에 성공하였습니다.");

	}

	@Override
	public ResponseEntity<?> login(UserTestReqDto.Login login) {

		if (userRepository.findByEmail(login.getEmail()).orElse(null) == null) {
			return Response.badRequest("해당하는 유저가 존재하지 않습니다.");
		}

		UsernamePasswordAuthenticationToken authenticationToken = login.toAuthentication();

		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

		UserTestResDto.TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

		redisTemplate.opsForValue()
						.set("RT:" + authentication.getName(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

		return Response.makeResponse(HttpStatus.OK, "로그인에 성공했습니다.", 0, tokenInfo);
	}
}
