package com.ezpz.shabit.admin.service;

import com.ezpz.shabit.admin.dto.YouTubeDto;
import com.ezpz.shabit.info.dto.req.VodReqDto;
import com.ezpz.shabit.info.entity.Category;
import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.info.repository.CategoryRepository;
import com.ezpz.shabit.info.repository.VodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.InputMismatchException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final VodRepository vodRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public int insertVod(YouTubeDto youtube, Long categoryId) {
        Vod vod = vodRepository.findByVideoId(youtube.getVideoId());
        Optional<Category> category = categoryRepository.findById(categoryId);
        if(vod != null)
            throw new DataIntegrityViolationException("이미 존재하는 영상입니다.");
        if(category.isEmpty())
            throw new NullPointerException("카테고리를 찾을 수 없습니다.");

        vod = Vod.builder()
                .thumbnail(youtube.getThumbnail())
                .title(youtube.getTitle())
                .originalLength(youtube.getOriginalLength())
                .category(category.get())
                .videoId(youtube.getVideoId())
                .build();

        if(youtube.getLength() < 4){
            vod.setLength(3);
        }else if(youtube.getLength() < 8){
            vod.setLength(5);
        } else if(youtube.getLength() < 12){
            vod.setLength(10);
        } else throw new InputMismatchException("영상 길이가 13분 이상입니다.");

        vodRepository.save(vod);
        return 1;
    }


}
