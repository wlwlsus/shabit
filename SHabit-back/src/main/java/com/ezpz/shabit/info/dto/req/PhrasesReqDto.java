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
public class PhrasesReqDto {
    @Schema(description = "문구 내용", example = "바른 자세는 척추 건강에 도움이 됩니다.")
    private String content;
}
