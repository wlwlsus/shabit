package com.ezpz.shabit.goal.entity;

import com.ezpz.shabit.user.entity.Users;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "goal")
public class Goal {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "goal_id", nullable = false, columnDefinition = "BIGINT UNSIGNED")
  private Long goalId;

  @OneToOne(optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  private Users user;

  @Column(name = "percentage", nullable = false)
  private int percentage;

  @Column(name = "time", nullable = false)
  private int time;

  public void setGoal(int percentage, int time) {
    this.percentage = percentage;
    this.time = time;
  }
}
