package com.ezpz.shabit.statistics.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "posture")
public class Posture {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "posture_id", nullable = false, columnDefinition = "BIGINT UNSIGNED")
  private Long postureId;

  @Column(name = "name", nullable = false)
  private String name;
}
