package com.ezpz.shabit.info.dto.req;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VodReqDto {
    @Schema(description = "카테고리 아이디", example = "1")
    private Long categoryId;
    @Schema(description = "영상 url", example = "https://www.youtube.com/watch?v=FMOISIlhLEY")
    private String url;
}
