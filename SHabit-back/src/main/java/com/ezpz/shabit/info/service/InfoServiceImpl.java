package com.ezpz.shabit.info.service;

import com.ezpz.shabit.info.dto.res.CategoryResDto;
import com.ezpz.shabit.info.dto.res.PhrasesResDto;
import com.ezpz.shabit.info.dto.res.VodResDto;
import com.ezpz.shabit.info.entity.Category;
import com.ezpz.shabit.info.entity.Phrases;
import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.info.repository.CategoryRepository;
import com.ezpz.shabit.info.repository.PhrasesRepository;
import com.ezpz.shabit.info.repository.VodRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@Slf4j
@RequiredArgsConstructor
public class InfoServiceImpl implements InfoService {
  private final CategoryRepository categoryRepository;
  private final PhrasesRepository phrasesRepository;
  private final VodRepository vodRepository;


  @Override
  public List<VodResDto> getVodList() throws Exception {
    List<Vod> length3 = vodRepository.findByLength(3);
    List<Vod> length5 = vodRepository.findByLength(5);
    List<Vod> length10 = vodRepository.findByLength(10);

    log.info("length 3 vodList : {}", length3);
    log.info("length 5 vodList : {}", length5);
    log.info("length 10 vodList : {}", length10);

    List<VodResDto> list = new ArrayList<>();

    list.add(getRandomVod(length3));
    list.add(getRandomVod(length5));
    list.add(getRandomVod(length10));

    log.info("random vodList : {}", list);

    return list;
  }

  @Override
  public PhrasesResDto getPhrase() throws Exception {
    List<Phrases> phrasesList = phrasesRepository.findAll();
    log.info("phrasesList : {}", phrasesList);

    return getRandomPhrases(phrasesList);
  }

  private VodResDto getRandomVod(List<Vod> list) {
    VodResDto vod = new VodResDto();
    Random random = new Random();

    int index = random.nextInt(list.size());
    log.info("random vod index : {}", index);
    log.info("random vod : {}", list.get(index));

    return new VodResDto(list.get(index));
  }

  private PhrasesResDto getRandomPhrases(List<Phrases> list) {
    PhrasesResDto phrases = new PhrasesResDto();
    Random random = new Random();

    int index = random.nextInt(list.size());
    log.info("random phrases index : {}", index);
    log.info("random phrases : {}", list.get(index));

    return new PhrasesResDto(list.get(index));
  }


  @Override
  public List<CategoryResDto> getCategoryList() throws Exception {
    List<Category> list = categoryRepository.findAll();
    log.info("list in service : {}", list);
    List<CategoryResDto> result = list.stream().map((CategoryResDto::new)).toList();
    return result;
  }

}
