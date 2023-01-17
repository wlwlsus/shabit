package com.ezpz.shabit.user.dto.res;

import com.ezpz.shabit.user.entity.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class UserTestResDto {

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    public static class UserInfo {


        private String grantType;

        private String accessToken;

        private String refreshToken;

        private Long refreshTokenExpirationTime;

        private LoginUserRes user;

    }

    @Builder
    @Getter
    public static class LoginUserRes {


        private String email;

        private String nickname;

        private String color;

        private Image image;

    }
}
