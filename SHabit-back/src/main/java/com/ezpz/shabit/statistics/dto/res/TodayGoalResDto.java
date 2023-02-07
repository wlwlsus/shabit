package com.ezpz.shabit.statistics.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TodayGoalResDto {
    private int percentage;
    private int time;
}
