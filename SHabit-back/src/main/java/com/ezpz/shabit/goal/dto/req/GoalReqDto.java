package com.ezpz.shabit.goal.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoalReqDto {
    @Schema(description = "나의 목표 percentage", example = "70")
    private int percentage;
    @Schema(description = "나의 목표 minute", example = "15")
    private int time;
}
