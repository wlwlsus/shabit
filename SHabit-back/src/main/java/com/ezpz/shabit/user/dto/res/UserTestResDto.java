package com.ezpz.shabit.user.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class UserTestResDto {

    @Builder
    @Getter
    @AllArgsConstructor
    public static class TokenInfo {

        private String grantType;

        private String accessToken;

        private String refreshToken;

        private Long refreshTokenExpirationTime;

    }
}
