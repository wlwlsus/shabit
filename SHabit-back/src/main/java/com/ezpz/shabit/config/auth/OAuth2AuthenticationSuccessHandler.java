package com.ezpz.shabit.config.auth;

import com.ezpz.shabit.jwt.JwtTokenProvider;
import com.ezpz.shabit.user.dto.res.UserTestResDto;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.Optional;


/**
 * author : cadqe13@gmail.com
 * date : 2023-02-03
 * description :
 */

@Log4j2
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	@Value("${app.oauth2.authorizedRedirectUri}")
	private String redirectUri;
	private final JwtTokenProvider jwtTokenProvider;
	private final CookieAuthorizationRequestRepository authorizationRequestRepository;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

		log.info("request : " + request);
		log.info("response : " + response);
		log.info("authentication : " + authentication);
		log.info("성공~~~!!!!!");
//		String targetUrl = determineTargetUrl(request, response, authentication);

//		if (response.isCommitted()) {
//			log.debug("Response has already been committed");
//			return;
//		}
//		clearAuthenticationAttributes(request, response);
//		getRedirectStrategy().sendRedirect(request, response, targetUrl);
	}

	protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
		Optional<String> redirectUri = CookieUtil.getCookie(request, CookieAuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME)
						.map(Cookie::getValue);

		if (redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
//			throw new BadRequestException("redirect URIs are not matched");
		}
		String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

		// JWT 생성
		UserTestResDto.TokenInfo accessToken = jwtTokenProvider.generateToken(authentication);
//		tokenProvider.createRefreshToken(authentication, response);

		return UriComponentsBuilder.fromUriString(targetUrl)
						.queryParam("accessToken", accessToken)
						.build().toUriString();
	}

	protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
		super.clearAuthenticationAttributes(request);
		authorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
	}

	private boolean isAuthorizedRedirectUri(String uri) {
		URI clientRedirectUri = URI.create(uri);
		URI authorizedUri = URI.create(redirectUri);

		if (authorizedUri.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
						&& authorizedUri.getPort() == clientRedirectUri.getPort()) {
			return true;
		}
		return false;
	}
}