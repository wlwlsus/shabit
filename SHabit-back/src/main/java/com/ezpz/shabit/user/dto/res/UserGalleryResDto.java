package com.ezpz.shabit.user.dto.res;

import com.ezpz.shabit.user.entity.Gallery;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserGalleryResDto {
  long postureId;
  String url;

  public UserGalleryResDto(Gallery gallery) {
    this.postureId = gallery.getPosture().getPostureId();
    this.url = gallery.getUrl();
  }

}
