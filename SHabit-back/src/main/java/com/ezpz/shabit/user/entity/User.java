package com.ezpz.shabit.user.entity;

import com.ezpz.shabit.util.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id", nullable = false)
  private Long userId;

  @Column(name = "email", nullable = false)
  private String email;

  @Column(name = "nickname", nullable = false)
  private String nickname;

  @Column(name = "password", nullable = false)
  private String password;

  @OneToOne
  @JoinColumn(name = "user_id", nullable = false)
  private Image image;
}
