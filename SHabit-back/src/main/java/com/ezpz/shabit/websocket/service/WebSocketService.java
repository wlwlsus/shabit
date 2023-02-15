package com.ezpz.shabit.websocket.service;

public interface WebSocketService {
  void connectUser(String email);

  void disconnectUser(String email);
}
