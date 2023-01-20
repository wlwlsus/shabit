package com.ezpz.shabit.statistics.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatisticsSimpleResDto {
    private Long postureId;
    private int time; // 분
    private LocalDate date;
}
