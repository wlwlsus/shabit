package com.ezpz.shabit.statistics.dto.res;

import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TodayGoalResDto {
    private int percentage;
    private int time;
}
