package com.ezpz.shabit.info.dto.req;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VodReqDto {
    private String name;
    private String category;
    private String url;
    private int length;
}
