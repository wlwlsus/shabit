package com.ezpz.shabit.user.entity;

import com.ezpz.shabit.statistics.entity.Posture;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "gallery")
public class Gallery {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "gallery_id", nullable = false, columnDefinition = "BIGINT UNSIGNED")
  private Long galleryId;

  @ManyToOne(optional = false)
  @JoinColumn(name = "posture_id", nullable = false)
  private Posture posture;

  @ManyToOne(optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  private Users user;

  @Column(name = "url", nullable = false)
  private String url;
}
