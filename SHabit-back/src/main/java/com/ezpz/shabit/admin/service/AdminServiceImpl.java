package com.ezpz.shabit.admin.service;

import com.ezpz.shabit.info.dto.req.VodReqDto;
import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.info.repository.VodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final VodRepository vodRepository;

    @Override
    public int insertVod(VodReqDto req) {
        int res = 0;
        Vod vod = vodRepository.findByUrl(req.getUrl());
        if(vod == null){
            vodRepository.save(Vod.builder()
                    .url(req.getUrl())
                    .length(req.getLength())
                    .name(req.getName())
                    .category(req.getCategory())
                    .build());
            res = 1;
        }
        return res;
    }


}
