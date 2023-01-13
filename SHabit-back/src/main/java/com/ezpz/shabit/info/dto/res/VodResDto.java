package com.ezpz.shabit.info.dto.res;

import com.ezpz.shabit.info.entity.Vod;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class VodResDto {
  private String name;
  private String category;
  private String url;
  private int length;

  public VodResDto(Vod vod) {
    this.name = vod.getName();
    this.category = vod.getCategory();
    this.url = vod.getUrl();
    this.length = vod.getLength();
  }

}
