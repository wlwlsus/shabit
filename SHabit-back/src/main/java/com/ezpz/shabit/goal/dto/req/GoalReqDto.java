package com.ezpz.shabit.goal.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoalReqDto {

    @Pattern(regexp = "^(100|[1-9][0-9]|[0-9])$", message = "입력된 percentage가 0이상 100이하의 정수가 아닙니다.")
    @Schema(description = "나의 목표 percentage", example = "70")
    private int percentage;

    @Pattern(regexp = "^(1440|[1-9][0-9]{1,3}|[0-9]{1,3})$", message = "입력된 time이 0이상 1440이하의 정수가 아닙니다.")
    @Schema(description = "나의 목표 minute", example = "15")
    private int time;
}
