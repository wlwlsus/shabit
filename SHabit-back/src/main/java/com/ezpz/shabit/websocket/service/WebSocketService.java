package com.ezpz.shabit.websocket.service;

public interface WebSocketService {
  boolean checkDuplication(String email);

  void connectUser(String email, String token);

  void disconnectUser(String email, String token);
}
