package com.ezpz.shabit.statistics.entity;

import com.ezpz.shabit.user.entity.Users;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "daily")
public class Daily {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "daily_id", nullable = false, columnDefinition = "BIGINT UNSIGNED")
  private Long dailyId;

  @ManyToOne(optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  private Users user;

  @ManyToOne(optional = false)
  @JoinColumn(name = "posture_id", nullable = false)
  private Posture posture;

  @Column(name = "start_time", nullable = false)
  private LocalDateTime startTime;

  @Column(name = "end_time", nullable = false)
  private LocalDateTime endTime;
}
