package com.ezpz.shabit.info.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "vod")
public class Vod {
  @Id
  @Column(name = "vod_id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long vodId;

  @Column(name = "name", nullable = false)
  private String name; // 유튜브 제목

  @Column(name = "category", nullable = false)
  private String category;

  @Column(name = "url", nullable = false)
  private String url;

  @Column(name = "length", nullable = false)
  private int length;
}
