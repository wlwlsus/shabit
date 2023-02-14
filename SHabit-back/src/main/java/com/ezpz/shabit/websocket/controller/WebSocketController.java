package com.ezpz.shabit.websocket.controller;

import com.ezpz.shabit.websocket.model.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
public class WebSocketController {

  @MessageMapping("/example")
  @SendTo("/topic/example")
  public Message sendMessage(Message message) {
    log.info("메시지 수신!! : {} ", message);
    return message;
  }
}