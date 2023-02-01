package com.ezpz.shabit.admin.dto;


import lombok.*;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class YouTubeDto {
    private String title; // 동영상 제목
    private String thumbnail; //동영상 썸네일 경로
    private String videoId; // 동영상 식별 ID
    private String originalLength; // 동영상 재생 시간
    private int length; // 동영상 재생 시간 minute단위만 뽑은 int

}