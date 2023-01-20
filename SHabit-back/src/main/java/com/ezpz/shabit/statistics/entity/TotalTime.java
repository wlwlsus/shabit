package com.ezpz.shabit.statistics.entity;

import com.ezpz.shabit.user.entity.Users;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name="total_time")
public class TotalTime {
    @Id
    @Column(name = "total_time_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long totalTimeId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(name = "today", nullable = false)
    private int today; // 오늘 총 시간

    @Column(name = "weekly", nullable = false)
    private int weekly; // 주간 총 시간

    @Column(name = "monthly", nullable = false)
    private int monthly; // 월간 총 시간
}
