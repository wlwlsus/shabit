package com.ezpz.shabit.user.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserReqDto {
  @Schema(description = "닉네임", example = "ssafy")
  String nickname;
}
