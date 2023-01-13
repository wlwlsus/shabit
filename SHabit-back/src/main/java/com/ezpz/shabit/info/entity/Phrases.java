package com.ezpz.shabit.info.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name="setting")
public class Phrases {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long phrasesId;

    @Column(name = "content", nullable = false)
    private int content;
}
