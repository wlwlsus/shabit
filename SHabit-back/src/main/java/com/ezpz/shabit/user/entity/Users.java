package com.ezpz.shabit.user.entity;

import com.ezpz.shabit.util.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name="users")
public class Users extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id", nullable = false)
    private Long userId;

    @Column(name="email", length=63, nullable = false)
    private String email;

    @Column(name="nickname", length=15, nullable = false)
    private String nickname;

    @Column(name="password", nullable = false)
    private String password;

    @Column(name="theme", columnDefinition="integer default 0")
    private int theme;

    @Column(name="profile")
    private String profile;
}
