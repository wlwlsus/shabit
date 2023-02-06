package com.ezpz.shabit.user.entity;

import com.ezpz.shabit.config.oauth.entity.ProviderType;
import com.ezpz.shabit.util.BaseTimeEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class Users extends BaseTimeEntity implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id", nullable = false, columnDefinition = "BIGINT UNSIGNED")
	private Long userId;

	@Column(name = "email", length = 63, nullable = false)
	private String email;

	@Column(name = "nickname", length = 15, nullable = false)
	private String nickname;

	@Column(name = "password")
	private String password;

	@Column(name = "theme", columnDefinition = "integer default 0")
	private int theme;

	@Column(name = "profile")
	private String profile;

	@Column(name = "roles")
	@ElementCollection(fetch = FetchType.EAGER)
	@Builder.Default
	private List<String> roles = new ArrayList<>();


	@Column(name = "provider_type", length = 20)
	@Enumerated(EnumType.STRING)
	@NotNull
	private ProviderType providerType;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public void setTheme(int theme) {
		this.theme = theme;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public Users update(String nickname, String profile) {
		this.nickname = nickname;
		this.profile = profile;
		return this;
	}
}
