package com.ezpz.shabit.config.auth;

import com.ezpz.shabit.user.entity.Users;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {

	private final String name;
	private final String email;
	private final String picture;

	public SessionUser(Users user) {
		this.email = user.getEmail();
		this.name = user.getNickname();
		this.picture = user.getProfile();
	}
}
