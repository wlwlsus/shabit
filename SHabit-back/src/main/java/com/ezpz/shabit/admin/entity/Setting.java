package com.ezpz.shabit.admin.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "setting")
public class Setting {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "setting_id", nullable = false, columnDefinition = "BIGINT UNSIGNED")
  private Long settingId;

  @Column(name = "stretching_time", columnDefinition = "integer default 50", nullable = false)
  private int stretchingTime;

  @Column(name = "alert_time", columnDefinition = "integer default 3", nullable = false)
  private int alertTime;

  public void setStretchingTime(int stretchingTime) {
    this.stretchingTime = stretchingTime;
  }

  public void setAlertTime(int alertTime) {
    this.alertTime = alertTime;
  }
}
