package com.ezpz.shabit.info.dto.res;

import com.ezpz.shabit.info.entity.Phrases;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PhrasesResDto {
  String content;

  public PhrasesResDto(Phrases phrases) {
    this.content = phrases.getContent();
  }
}
