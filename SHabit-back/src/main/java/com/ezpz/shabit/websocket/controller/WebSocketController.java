package com.ezpz.shabit.websocket.controller;

import com.ezpz.shabit.websocket.model.Message;
import com.ezpz.shabit.websocket.service.WebSocketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class WebSocketController {

  private final WebSocketService webSocketService;

  @MessageMapping("/ping")
  @SendTo("/topic/pong")
  public String pong(String message) {
    log.info("메시지 수신!! : {} ", message);
    return "PONG!";
  }

  @MessageMapping("/connect")
  @SendTo("/topic/connect")
  public String getConnect(String email) {
    log.info("getConnect 수신!! : {} ", email);
    webSocketService.connectUser(email);
    return "Connected!";
  }

  @MessageMapping("/disconnect")
  @SendTo("/topic/disconnect")
  public String getDisconnect(String email) {
    log.info("getDisconnect 수신!! : {} ", email);
    webSocketService.disconnectUser(email);
    return "Disconnected!";
  }
}