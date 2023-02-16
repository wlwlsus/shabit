package com.ezpz.shabit.config.security;

import com.ezpz.shabit.config.oauth.handler.OAuth2AuthenticationFailureHandler;
import com.ezpz.shabit.config.oauth.handler.OAuth2AuthenticationSuccessHandler;
import com.ezpz.shabit.config.oauth.repository.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.ezpz.shabit.config.oauth.service.CustomOAuth2UserService;
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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class WebSecurityConfig {

  private final CustomOAuth2UserService oAuth2UserService;
  private final JwtTokenProvider jwtTokenProvider;
  private final RedisTemplate<String, String> redisTemplate;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws
      Exception {
    httpSecurity
        .cors()
        .configurationSource(corsConfigurationSource());

    httpSecurity
        .httpBasic().disable()
        .csrf().disable()
        .formLogin().disable()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authorizeHttpRequests()
        .requestMatchers("/ws/**", "/api/v1/user/password-find/**", "/api/v1/user/email-check/**", "/api/v1" +
            "/user/email" +
            "-valid/**", "/api/v1/user", "/api/v1/user/login", "/api/v1/user/logout", "/api/v1/user/token", "/swagger-ui/**", "/v3/api" +
            "-docs/**").permitAll()
        .requestMatchers(HttpMethod.GET, "/api/v1/admin/alarm").permitAll()
        .requestMatchers("/**").hasAnyRole("USER", "ADMIN");

    httpSecurity
        .oauth2Login()
        .authorizationEndpoint()
        .baseUri("/oauth2/authorization")
        .authorizationRequestRepository(oAuth2AuthorizationRequestBasedOnCookieRepository())
        .and()
        .redirectionEndpoint()
        .baseUri("/*/oauth2/code/*")
        .and()
        .userInfoEndpoint()
        .userService(oAuth2UserService)
        .and()
        .successHandler(oAuth2AuthenticationSuccessHandler())
        .failureHandler(oAuth2AuthenticationFailureHandler());

    httpSecurity.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, redisTemplate), UsernamePasswordAuthenticationFilter.class);

    return httpSecurity.build();
  }


  // 암호화에 필요한 PasswordEncoder Bean 등록
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  /*
   * 쿠키 기반 인가 Repository
   * 인가 응답을 연계 하고 검증할 때 사용.
   * */
  @Bean
  public OAuth2AuthorizationRequestBasedOnCookieRepository oAuth2AuthorizationRequestBasedOnCookieRepository() {
    return new OAuth2AuthorizationRequestBasedOnCookieRepository();
  }

  /*
   * Oauth 인증 성공 핸들러
   * */
  @Bean
  public OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler() {
    return new OAuth2AuthenticationSuccessHandler(
        oAuth2AuthorizationRequestBasedOnCookieRepository(),
        jwtTokenProvider,
        redisTemplate);
  }

  /*
   * Oauth 인증 실패 핸들러
   * */
  @Bean
  public OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler() {
    return new OAuth2AuthenticationFailureHandler(oAuth2AuthorizationRequestBasedOnCookieRepository());
  }


  // CORS 허용 적용
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();

    configuration.addAllowedOriginPattern("*");
    configuration.addAllowedHeader("*");
    configuration.addAllowedMethod("*");
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}
