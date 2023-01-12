package com.ezpz.shabit.statistics.entity;

import com.ezpz.shabit.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name="statistics")
public class Statistics {
    @Id
    @Column(name = "statistics_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long statisticsId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "posture_id", nullable = false)
    private Posture posture;

    @Column(name = "time", nullable = false)
    private int time; // 분

    @Column(name = "date", nullable = false)
    private Date date;
}
