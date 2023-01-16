package com.ezpz.shabit.user.dto.req;

import lombok.Getter;
import lombok.Setter;

public class UserTestReqDto {

    @Getter
    @Setter
    public static class Login {
        private String email;

        private String password;
    }

}
