package com.ezpz.shabit.websocket.model;

import lombok.*;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Message {
  private String title;
  private String content;
}