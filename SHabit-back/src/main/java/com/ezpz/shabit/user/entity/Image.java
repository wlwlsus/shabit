package com.ezpz.shabit.user.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "image")
public class Image {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "image_id", nullable = false)
  private Long imageId;

  @Column(name = "file_name", nullable = false)
  private String fileName;

  @Column(name = "file_original_name", nullable = false)
  private String fileOriginalName;

  @Column(name = "file_url", nullable = false)
  private String fileUrl;
}
