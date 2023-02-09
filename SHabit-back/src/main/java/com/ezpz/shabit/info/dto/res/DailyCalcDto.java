package com.ezpz.shabit.info.dto.res;

import com.ezpz.shabit.statistics.entity.Daily;
import com.ezpz.shabit.statistics.entity.Posture;
import lombok.*;

import java.time.Duration;
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class DailyCalcDto {
  private Posture posture;
  private long time;

  public DailyCalcDto(Daily daily) {
    this.posture = daily.getPosture();

    Duration diff = Duration.between(daily.getStartTime(), daily.getEndTime());
    this.time = diff.toHours() * 60 * 60 + diff.toMinutes() * 60 + diff.toSeconds();
  }
}
