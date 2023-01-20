package com.ezpz.shabit.admin.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SettingResDto {
    private int stretchingTime;
    private int alertTime;
}
