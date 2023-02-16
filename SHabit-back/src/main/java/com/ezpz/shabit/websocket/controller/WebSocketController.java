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

	@MessageMapping("/check")
	@SendTo("/topic/check")
	public String checkDuplicate(Message message) {
		if (webSocketService.checkDuplication(message.getEmail())){
			log.info("Duplicated");
			return "Duplicated";
		}
		log.info("Not Duplicated");
		return "Not Duplicated";
	}


	@MessageMapping("/ping")
	@SendTo("/topic/pong")
	public String pong(Message message) {
		webSocketService.connectUser(message.getEmail(), message.getRefreshToken());
		return "pong";
	}

	@MessageMapping("/disconnect")
	@SendTo("/topic/disconnect")
	public String getDisconnect(Message message) {
		log.info("getDisconnect 수신 : {}", message);
		webSocketService.disconnectUser(message.getEmail(), message.getRefreshToken());
		return "Disconnected!";
	}
}