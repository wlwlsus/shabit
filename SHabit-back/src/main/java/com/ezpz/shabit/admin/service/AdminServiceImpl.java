package com.ezpz.shabit.admin.service;

import com.ezpz.shabit.info.entity.Phrases;
import com.ezpz.shabit.info.repository.PhrasesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final PhrasesRepository phrasesRepository;

    @Override
    public List<Phrases> getPhrasesList() {
        return phrasesRepository.findAll();
    }
}
