package com.ezpz.shabit.user.aop;

import com.ezpz.shabit.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpStatusCodeException;

/**
 * author : cadqe13@gmail.com
 * date : 2023-02-09
 * description :
 */

@Aspect
@RequiredArgsConstructor
@Slf4j
@Component
public class UserArgumentAspect {

	private final UserService userService;
	private final HttpServletRequest httpServletRequest;

	@Before("@annotation(com.ezpz.shabit.user.annotation.UserValid)")
	public void userCheck() {
		try {
			boolean user = userService.checkEmail(httpServletRequest.getParameter("email"));
			log.info("User Valid : {}", user);
			if (!user)
				throw new HttpStatusCodeException(HttpStatus.BAD_REQUEST, "입력하신 회원이 존재하지 않습니다.") {
				};
		} catch (Exception e) {
			log.error(e.getMessage());
		}
	}
}
