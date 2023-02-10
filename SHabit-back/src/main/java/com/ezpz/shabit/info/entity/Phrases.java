package com.ezpz.shabit.info.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "phrases")
public class Phrases {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "phrases_id", nullable = false, columnDefinition = "BIGINT UNSIGNED")
  private Long phrasesId;

  @Column(name = "content", nullable = false)
  private String content;
}
