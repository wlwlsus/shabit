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
public class VodListReqDto {
    @Schema(description = "카테고리 아이디", example = "1")
    private String categoryId;
    @Schema(description = "3, 5, 10분", example = "3")
    private String length;
}

