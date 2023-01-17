package com.ezpz.shabit.admin.service;

import com.ezpz.shabit.info.dto.req.PhrasesReqDto;
import com.ezpz.shabit.info.entity.Phrases;
import com.ezpz.shabit.info.repository.PhrasesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final PhrasesRepository phrasesRepository;

    @Override
    public int insertPhrases(PhrasesReqDto req) {
        int res = 0;
        Phrases phrases = phrasesRepository.findByContent(req.getContent());
        if(phrases == null){
            phrasesRepository.save(Phrases.builder()
                            .content(req.getContent())
                            .build());
            res = 1;
        }
        return res;
    }
}
