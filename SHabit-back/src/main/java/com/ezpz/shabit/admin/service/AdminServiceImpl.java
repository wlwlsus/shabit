package com.ezpz.shabit.admin.service;

import com.ezpz.shabit.info.repository.PhrasesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final PhrasesRepository phrasesRepository;

    @Override
    public int deletePhrases(List<Integer> phrasesIdList) {
        phrasesIdList.forEach(i -> {
                if(phrasesRepository.findById(Integer.toUnsignedLong(i)).isEmpty()){
                    throw new NullPointerException("없는 문구 입니다.");
                }
                phrasesRepository.deleteById(Integer.toUnsignedLong(i));});
        return phrasesIdList.size();
    }
}
