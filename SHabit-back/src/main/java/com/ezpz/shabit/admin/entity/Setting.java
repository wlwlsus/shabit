package com.ezpz.shabit.admin.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name="setting")
public class Setting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long settingId;

    @Column(name = "stretching_time", nullable = false)
    private int stretchingTime;

    @Column(name = "alert_time", nullable = false)
    private int alertTime;

    public void setStretchingTime(int stretchingTime) {
        this.stretchingTime = stretchingTime;
    }

    public void setAlertTime(int alertTime) {
        this.alertTime = alertTime;
    }
}
