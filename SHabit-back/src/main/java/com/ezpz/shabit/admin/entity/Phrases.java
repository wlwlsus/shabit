package com.ezpz.shabit.admin.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name="phrases")
public class Phrases {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long phrasesId;

    @Column(name = "content", nullable = false)
    private String content;
}
