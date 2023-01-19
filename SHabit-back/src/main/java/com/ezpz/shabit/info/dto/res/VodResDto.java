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
    private String title;
    private Long categoryId;
    private String videoId;
    private int length;
    private String originalLength;
    private String thumbnail;
}
