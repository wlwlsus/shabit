package com.ezpz.shabit.websocket.controller;

import com.ezpz.shabit.websocket.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

  @MessageMapping("/sendMessage")
  @SendTo("/topic/public")
  public Message sendMessage(Message message) {
    return message;
  }
}