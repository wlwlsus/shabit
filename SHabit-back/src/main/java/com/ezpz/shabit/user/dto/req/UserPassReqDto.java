package com.ezpz.shabit.user.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPassReqDto {
  @Schema(description = "현재 비밀번호", example = "ssafy!1234")
  private String curPassword;
  @Schema(description = "변경하려는 비밀번호", example = "ssafy")
  private String changePassword;
}
