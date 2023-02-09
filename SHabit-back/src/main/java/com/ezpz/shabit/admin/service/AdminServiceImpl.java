package com.ezpz.shabit.admin.service;

import com.ezpz.shabit.admin.dto.YouTubeDto;
import com.ezpz.shabit.info.dto.req.PhrasesReqDto;
import com.ezpz.shabit.info.entity.Category;
import com.ezpz.shabit.info.entity.Phrases;
import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.info.repository.CategoryRepository;
import com.ezpz.shabit.info.repository.PhrasesRepository;
import com.ezpz.shabit.info.repository.VodRepository;
import com.ezpz.shabit.admin.dto.req.SettingReqDto;
import com.ezpz.shabit.admin.dto.res.SettingResDto;
import com.ezpz.shabit.admin.entity.Setting;
import com.ezpz.shabit.admin.repository.SettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.InputMismatchException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final VodRepository vodRepository;
    private final CategoryRepository categoryRepository;
    private final SettingRepository settingRepository;
    private final PhrasesRepository phrasesRepository;


    @Override
    public int deleteVod(List<String> videoIdList) {
        videoIdList.forEach(str -> {
            Vod vod = vodRepository.findByVideoId(str);
            if(vod == null){
                throw new NullPointerException("영상이 없습니다.");
            }
            vodRepository.delete(vod);
        });
        return videoIdList.size();
    }

    @Override
    public SettingResDto getSetting() {
        SettingResDto res = null;
        Setting setting = settingRepository.findById(1L).orElse(null);
        if(setting == null){
            throw new NullPointerException("초기 세팅이 되어있지 않습니다.");
        }else {
             res = SettingResDto.builder()
                    .stretchingTime(setting.getStretchingTime())
                    .alertTime(setting.getAlertTime())
                    .build();
        }
        return res;
    }

    @Override
    public List<Vod> getVodList(String search, String query, Pageable pageable) {
        if(search == null) return vodRepository.findAll(pageable).getContent();
        List<Integer> lengthList = List.of(3, 5, 10);
        return switch (search) {
            case ("category") -> vodRepository.findByCategoryCategoryId(Long.parseLong(query), pageable).getContent();
            case ("title") -> vodRepository.findByTitleIsLike("%" + query + "%", pageable).getContent();
            case ("length") -> {
                if(!lengthList.contains(Integer.parseInt(query)))
                    throw new InputMismatchException("검색 가능한 영상 길이는 3, 5, 10입니다.");
                yield vodRepository.findByLength(Integer.parseInt(query), pageable).getContent();
            }
            default -> vodRepository.findAll(pageable).getContent();
        };
    }

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

    @Override
    public int editSetting(SettingReqDto req) {
        int res = 0;
        Setting setting = settingRepository.findById(1L).orElse(null);
        if(setting == null){
            throw new NullPointerException("초기 세팅이 되어있지 않습니다.");
        }else {
            setting.setStretchingTime(req.getStretchingTime());
            setting.setAlertTime(req.getAlertTime());
            settingRepository.save(setting);
            res = 1;
        }
        return res;
    }

    @Override
    public int insertPhrases(PhrasesReqDto req) {
        int res = 0;
        Phrases phrases = phrasesRepository.findByContent(req.getContent());
        if(phrases == null){
            phrasesRepository.save(Phrases.builder()
                    .content(req.getContent())
                    .build());
            res = 1;
        } else{
            throw new DataIntegrityViolationException("이미 존재하는 문구입니다.");
        }
        return res;
    }

    @Override
    public List<Phrases> getPhrasesList(Pageable pageable) {
        return phrasesRepository.findAll(pageable).getContent();
    }

    @Override
    public int deletePhrases(List<String> phrasesContentList) {
        phrasesContentList.forEach(str -> {
            Phrases phrases = phrasesRepository.findByContent(str);
            if(phrases == null){
                throw new NullPointerException("존재하지않는 문구 입니다.");
            }
            phrasesRepository.delete(phrases);
        });
        return phrasesContentList.size();
    }

}
