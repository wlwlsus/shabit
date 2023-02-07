package com.ezpz.shabit.statistics.dto.res;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TodayPostureTimeResDto {
    Long total;
    List<Integer> time = List.of(0, 0, 0, 0);
}
