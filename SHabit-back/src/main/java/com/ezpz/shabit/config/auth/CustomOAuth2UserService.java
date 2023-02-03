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

import java.util.Optional;


@Log4j2
@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

  private final UserRepository userRepository;
  //	private final HttpSession httpSession;x
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

    Optional<Users> userOptional = userRepository.findByEmail(attributes.getEmail());
    Users users = userOptional.orElseGet(() -> createUser(attributes));



    return new DefaultOAuth2User(
        users.getAuthorities(),
        attributes.getAttributes(),
        attributes.getNameAttributeKey());
  }

  private Users createUser(OAuthAttributes attributes) {
    Users user = userRepository.findByEmail(attributes.getEmail())
        .map(entity -> entity.update(attributes.getNickname(), attributes.getPicture()))
        .orElse(attributes.toEntity());

    log.info("OAuth2 가입 유저 정보 : " + user);

    return userRepository.save(user);
  }
}