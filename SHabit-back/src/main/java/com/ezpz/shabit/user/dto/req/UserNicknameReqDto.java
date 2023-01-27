package com.ezpz.shabit.user.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserNicknameReqDto {
  @Pattern(regexp = "[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,16}", message = "닉네임 형식에 맞지 않습니다.")
  @Schema(description = "닉네임", example = "ssafy")
  String nickname;
}
