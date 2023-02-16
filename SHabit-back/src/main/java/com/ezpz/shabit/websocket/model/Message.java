package com.ezpz.shabit.websocket.model;

import lombok.*;

@Getter
@ToString
@RequiredArgsConstructor
public class Message {
  private String email;
  private String refreshToken;
}