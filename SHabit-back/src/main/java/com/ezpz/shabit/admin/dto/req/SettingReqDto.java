package com.ezpz.shabit.admin.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SettingReqDto {
    private int stretchingTime;
    private int alertTime;
}
