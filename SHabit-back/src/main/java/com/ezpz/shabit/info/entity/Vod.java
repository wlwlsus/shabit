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
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "vod_id", nullable = false, columnDefinition = "BIGINT UNSIGNED")
  private Long vodId;

  @Column(name = "title", nullable = false)
  private String title; // 유튜브 제목

  @ManyToOne(optional = false)
  @JoinColumn(name = "category_id", nullable = false)
  private Category category;

  @Column(name = "video_id", nullable = false)
  private String videoId;

  @Column(name = "length", nullable = false)
  private int length;

  @Column(name = "original_length", nullable = false)
  private String originalLength;

  @Column(name = "thumbnail", nullable = false)
  private String thumbnail;

  public void setLength(int length) {
    this.length = length;
  }
}
