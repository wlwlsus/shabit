package com.ezpz.shabit.info.dto.res;

import com.ezpz.shabit.info.entity.Category;
import com.ezpz.shabit.info.entity.Vod;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VodResDto {
  private String title;
  private Category category;
  private String videoId;
  private int length;
  private String originalLength;
  private String thumbnail;

  public VodResDto(Vod vod) {
    this.title = vod.getTitle();
    this.category = vod.getCategory();
    this.videoId = vod.getVideoId();
    this.length = vod.getLength();
  }
}
