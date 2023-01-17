package com.ezpz.shabit.statistics.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyResDto {
    private String posture;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
