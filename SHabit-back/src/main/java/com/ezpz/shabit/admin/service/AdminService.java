package com.ezpz.shabit.admin.service;

import com.ezpz.shabit.admin.dto.YouTubeDto;
import com.ezpz.shabit.admin.dto.req.SettingReqDto;
import com.ezpz.shabit.admin.dto.res.SettingResDto;
import com.ezpz.shabit.info.dto.req.PhrasesReqDto;
import com.ezpz.shabit.info.dto.req.VodReqDto;
import com.ezpz.shabit.info.entity.Phrases;
import com.ezpz.shabit.info.entity.Vod;

import java.util.List;

public interface AdminService {
    List<Vod> getVodList(String search, String query);
    int deleteVod(List<Integer> vodIdList);
    int insertVod(YouTubeDto youtube, Long categoryId);
    int editSetting(SettingReqDto setting);
    SettingResDto getSetting();
    int insertPhrases(PhrasesReqDto req);
    List<Phrases> getPhrasesList();
}
