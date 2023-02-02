package com.ezpz.shabit.config.auth;

import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;


/**
 * 구글 로그인 이후 가져온 사용자의 정보(email, name, picture) 기반 가입 및 정보수정, 세션 저장 등 기능 지원
 * <p>
 * registrationId
 * - 현재 로그인 중인 서비스를 구분하는 코드
 * - 지금은 구글만 사용하는 불필요한 값, 이후 네이버 로그인 연동시에 네이버 로그인인지, 구글 로그인인지 구분하기 위해 사용
 * <p>
 * userNameAttributeName
 * - OAuth2 로그인 진행 시 키가 되는 필드값을 이야기한다.
 * - Primary Key 와 같은 의미
 * - 구글의 경우 기본적으로 코드 지원, BUT 네이버, 카카오는 X
 * - 이후 네이버 로그인와 구글 로그인을 동시 지원할 때 사용
 * <p>
 * OAuthAttributes
 * - OAuth2UserService 를 통해 가져온 OAuth2User 의 attribute 를 담을 클래스
 * - 이후 네이버 등 다른 소셜 로그인도 이 클래스를 사용
 * <p>
 * SessionUser
 * - 세션에 사용자 정보를 저장하기 위한 Dto 클래스
 */
@Log4j2
@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

	private final UserRepository userRepository;
	//	private final HttpSession httpSession;
	private final RedisTemplate<String, Object> redisTemplate;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

		OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();

		OAuth2User oAuth2User = delegate.loadUser(userRequest);

		String registrationId = userRequest.getClientRegistration().getRegistrationId();

		String userNameAttributeName =
						userRequest.getClientRegistration()
										.getProviderDetails()
										.getUserInfoEndpoint()
										.getUserNameAttributeName();

		OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

		Users user = saveOrUpdate(attributes);

//		httpSession.setAttribute("user", new SessionUser(user));
//		redisTemplate.opsForValue().set("user", user);
//		Users data = (Users) redisTemplate.opsForValue().get("user");

		return new DefaultOAuth2User(
						user.getAuthorities(),
						attributes.getAttributes(),
						attributes.getNameAttributeKey());
	}

	private Users saveOrUpdate(OAuthAttributes attributes) {
		Users user = userRepository.findByEmail(attributes.getEmail())
						.map(entity -> entity.update(attributes.getNickname(), attributes.getPicture()))
						.orElse(attributes.toEntity());

		log.info("OAuth2 가입 유저 정보 : " + user);

		return userRepository.save(user);
	}
}