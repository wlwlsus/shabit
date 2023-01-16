package com.ezpz.shabit.info.service;

import com.ezpz.shabit.info.dto.res.PhrasesResDto;
import com.ezpz.shabit.info.dto.res.VodResDto;
import com.ezpz.shabit.info.entity.Phrases;

import java.util.List;

public interface InfoService {
  List<VodResDto> getVodList() throws Exception;

  PhrasesResDto getPhrase() throws Exception;
}
