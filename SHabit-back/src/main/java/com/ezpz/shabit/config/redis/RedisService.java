package com.ezpz.shabit.config.redis;

import com.ezpz.shabit.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

/**
 * author : cadqe13@gmail.com
 * date : 2023-02-14
 * description :
 */

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisService {

	private final RedisTemplate<String, String> redisTemplate;

	public boolean checkDuplicateLogins(String email) {
		// 관리자 권한은 중복 허용, 일반 유저는 로그인한 적이 있는 경우 중복 로그인 방지
		if (!email.equals("ssafyezpz@gmail.com") && redisTemplate.opsForValue().get("RT:" + email) != null) {
			log.error("이미 로그인 되어 있습니다. : {}", email);
			return true;
		}
		return false;
	}
}
