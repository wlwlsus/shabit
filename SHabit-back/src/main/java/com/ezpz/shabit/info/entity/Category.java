package com.ezpz.shabit.info.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "category")
public class Category {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "category_id", nullable = false, columnDefinition = "BIGINT UNSIGNED")
  private Long categoryId;

  @Column(name = "name", length = 15, nullable = false)
  private String name;
}
