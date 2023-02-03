package com.ezpz.shabit.config.auth;

import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.enums.Authority;
import lombok.Builder;
import lombok.Getter;

import java.util.Collections;
import java.util.Map;

@Getter
public class OAuthAttributes {

	private final Map<String, Object> attributes;
	private final String nameAttributeKey;
	private final String name;

	private final String nickname;
	private final String email;
	private final String picture;


	@Builder
	public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey, String name, String nickname,
	                       String email, String picture) {
		this.attributes = attributes;
		this.nameAttributeKey = nameAttributeKey;
		this.name = name;
		this.nickname = nickname;
		this.email = email;
		this.picture = picture;
	}

	public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
		System.out.println("정보 : " + registrationId + " | " + userNameAttributeName + " | " + attributes);
		if ("naver".equals(registrationId)) {
			return ofNaver(attributes);
		}

		if ("kakao".equals(registrationId)) {
			return ofKakao(attributes);
		}

		return ofGoogle(userNameAttributeName, attributes);
	}

	private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
		return OAuthAttributes.builder()
						.name((String) attributes.get("name"))
						.nickname((String) attributes.get("name"))
						.email((String) attributes.get("email"))
						.picture((String) attributes.get("picture"))
						.attributes(attributes)
						.nameAttributeKey(userNameAttributeName)
						.build();
	}

	private static OAuthAttributes ofNaver(Map<String, Object> attributes) {
		Map<String, Object> response = (Map<String, Object>) attributes.get("response");

		return OAuthAttributes.builder()
						.name((String) response.get("name"))
						.nickname((String) response.get("nickname"))
						.email((String) response.get("email"))
						.picture((String) response.get("profile_image"))
						.attributes(response)
						.nameAttributeKey("id")
						.build();
	}

	private static OAuthAttributes ofKakao(Map<String, Object> attributes) {
		Map<String, Object> response = (Map<String, Object>) attributes.get("kakao_account");
		Map<String, Object> profile = (Map<String, Object>) response.get("profile");
		return OAuthAttributes.builder()
						.email((String) response.get("email"))
						.name((String) profile.get("nickname"))
						.nickname((String) profile.get("nickname"))
						.picture((String) profile.get("profile_image_url"))
						.attributes(attributes)
						.nameAttributeKey("id")
						.build();
	}

	public Users toEntity() {
		return Users.builder()
						.email(email)
						.nickname(nickname)
						.profile(picture)
						.roles(Collections.singletonList(Authority.ROLE_USER.name()))
						.build();
	}
}