package com.ezpz.shabit.security;

import com.ezpz.shabit.jwt.JwtAuthenticationFilter;
import com.ezpz.shabit.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class WebSecurityConfig {

  private final JwtTokenProvider jwtTokenProvider;
  private final RedisTemplate redisTemplate;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws
      Exception {
    httpSecurity
        .httpBasic().disable()
        .csrf().disable()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authorizeHttpRequests()
        .requestMatchers("/api/v1/user/password-find/**", "/api/v1/user/email-check/**", "/api/v1/user/email-valid/**", "/api/v1/user", "/api/v1/user/login", "/api/v1/user/logout", "/api/v1/user/token", "/swagger-ui/**", "/v3/api" +
            "-docs/**").permitAll()
        .requestMatchers(HttpMethod.GET, "/api/v1/admin/alarm").permitAll()
        .requestMatchers("/**").hasRole("USER")
        .and()
        .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, redisTemplate), UsernamePasswordAuthenticationFilter.class);
    // JwtAuthenticationFilter를 UsernamePasswordAuthentictaionFilter 전에 적용시킨다.

    return httpSecurity.build();
  }


  // 암호화에 필요한 PasswordEncoder Bean 등록
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
