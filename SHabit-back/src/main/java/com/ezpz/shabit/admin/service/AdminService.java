package com.ezpz.shabit.admin.service;

import com.ezpz.shabit.admin.dto.YouTubeDto;
import com.ezpz.shabit.info.dto.req.VodReqDto;

public interface AdminService {
    int insertVod(YouTubeDto youtube, Long categoryId);
}
