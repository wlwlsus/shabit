package com.ezpz.shabit.statistics.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name="posture")
public class Posture {
    @Id
    @Column(name = "posture_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postureId;

    @Column(name = "name", nullable = false)
    private String name;
}
