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
@Table(name = "grass")
public class Grass {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "grass_id", nullable = false, columnDefinition = "BIGINT UNSIGNED")
  private Long grassId;

  @Column(name = "date", nullable = false)
  private LocalDate date;

  @Column(name = "percentage", nullable = false)
  private int percentage;

  @ManyToOne(optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  private Users user;
}
