package com.ezpz.shabit.statistics.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyReqDto {
    private String startTime;
    private String endTime;
    private String posture;
}
