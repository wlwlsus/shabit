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
    // 관리자 권한은 중복 허용, 일반 유저는 중복 트래킹 방지
    if (!email.equals("ssafyezpz@gmail.com") && redisTemplate.opsForValue().get("tracking:" + email) != null) {
      log.error("이미 이용 중인 계정입니다. : {}", email);
      return true;
    }
    return false;
  }

  public void saveTrackingUserSession(String email) {
    if (!checkDuplicateLogins(email))
      redisTemplate.opsForValue().set("tracking:" + email, "tracking");

  }

  public void removeTrackingUserSession(String email) {
    if (redisTemplate.opsForValue().get("tracking:" + email) != null) {
      redisTemplate.delete("tracking:" + email);
    }
  }
}
