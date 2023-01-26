package com.ezpz.shabit.statistics.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyReqDto {
  @Schema(description = "자세 시작 시간", example = "2023-01-18 14:11:23")
  private String startTime;
  @Schema(description = "자세 종료 시간", example = "2023-01-18 14:11:23")
  private String endTime;
  @Schema(description = "자세 분류", example = "2")
  private Long postureId;
}
