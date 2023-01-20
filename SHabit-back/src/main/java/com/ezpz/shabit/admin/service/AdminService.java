package com.ezpz.shabit.admin.service;

import com.ezpz.shabit.info.entity.Vod;

import java.util.List;

public interface AdminService {
    List<Vod> getVodList(String search, String query);
    int deleteVod(List<Integer> vodIdList);
}
