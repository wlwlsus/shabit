package com.ezpz.shabit.info.dto.res;

import com.ezpz.shabit.info.entity.Vod;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class VodResDto {
  private String title;
  private String thumbnail;
  private String originalLength;
  private Long categoryId;
  private String videoId;
  private int length;

  public VodResDto(Vod vod) {
    this.title = vod.getTitle();
    this.thumbnail = vod.getThumbnail();
    this.originalLength = vod.getOriginalLength();
    this.categoryId = vod.getCategory().getCategoryId();
    this.videoId = vod.getVideoId();
    this.length = vod.getLength();
  }

}