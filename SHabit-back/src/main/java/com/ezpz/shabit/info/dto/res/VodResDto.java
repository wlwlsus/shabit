package com.ezpz.shabit.info.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VodResDto {
    private String name;
    private String category;
    private String url;
    private int length;
}
