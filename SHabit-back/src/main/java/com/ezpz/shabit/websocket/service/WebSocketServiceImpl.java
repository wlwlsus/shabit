package com.ezpz.shabit.websocket.service;

import com.ezpz.shabit.config.redis.RedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class WebSocketServiceImpl implements WebSocketService {

  private final RedisService redisService;

  @Override
  public void connectUser(String email) {
    redisService.saveTrackingUserSession(email);
  }

  @Override
  public void disconnectUser(String email) {
    redisService.removeTrackingUserSession(email);
  }
}
