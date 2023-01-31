package com.ezpz.shabit.statistics.entity;

import com.ezpz.shabit.user.entity.Users;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "statistics")
public class Statistics {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "statistics_id", nullable = false, columnDefinition = "BIGINT UNSIGNED")
  private Long statisticsId;

  @ManyToOne(optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  private Users user;

  @ManyToOne(optional = false)
  @JoinColumn(name = "posture_id", nullable = false)
  private Posture posture;

  @Column(name = "time", nullable = false)
  private int time; // 분

  @Column(name = "date", nullable = false)
  private LocalDate date;
}
