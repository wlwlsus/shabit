package com.ezpz.shabit.admin.service;

import com.ezpz.shabit.info.dto.req.VodReqDto;
import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.info.repository.CategoryRepository;
import com.ezpz.shabit.info.repository.VodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final VodRepository vodRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public int insertVod(VodReqDto req) {
        int res = 0;
        Vod vod = vodRepository.findByUrl(req.getUrl());
        if(vod == null){ // 중복되지 않음!
            if(req.getLength() < 4){
                req.setLength(3);
            }else if(req.getLength() < 8){
                req.setLength(5);
            } else if(req.getLength() < 12){
                req.setLength(10);
            }
            vodRepository.save(Vod.builder()
                    .url(req.getUrl())
                    .length(req.getLength())
                    .name(req.getName())
                    .category(categoryRepository.findById(req.getCategoryId()).orElse(null))
                    .build());
            res = 1;
        }
        return res;
    }


}
