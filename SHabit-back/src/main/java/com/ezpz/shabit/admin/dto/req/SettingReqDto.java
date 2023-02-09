package com.ezpz.shabit.admin.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SettingReqDto {
    @Schema(description = "스트레칭 시간", example = "50")
    private int stretchingTime;
    @Schema(description = "알람 푸쉬 시간", example = "3")
    private int alertTime;
}
