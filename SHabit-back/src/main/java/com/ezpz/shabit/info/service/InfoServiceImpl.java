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
import com.ezpz.shabit.info.dto.res.DailyCalcDto;
import com.ezpz.shabit.statistics.entity.Daily;
import com.ezpz.shabit.statistics.entity.Posture;
import com.ezpz.shabit.statistics.repository.DailyRepository;
import com.ezpz.shabit.statistics.repository.PostureRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

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
  private final DailyRepository dailyRepository;

  private final PostureRepository postureRepository;


  @Override
  @Transactional
  public List<VodResDto> getVodList(String email) throws Exception {
    // daily 자세 가져오기
    List<Daily> dList = dailyRepository.findByUserEmailOrderByEndTime(email);
    List<DailyCalcDto> list = dList.stream().map(DailyCalcDto::new).toList();
    log.info("daily list : {}", dList);

    // category 테이블 가져오기
    Map<Long, Long> map = new HashMap<>();

    List<Posture> pList = postureRepository.findAll();
    log.info("posture list : {}", pList);
    for (Posture p : pList) {
      map.put(p.getPostureId(), 0L);
    }
    // 자세에 따른 시간 구하기
    long postureId = 0;
    long max = 0;
    for (DailyCalcDto calc : list) {
      long id = calc.getPosture().getPostureId();
      if (id == 1)
        continue;
      long time = map.get(id);
      long sum = time + calc.getTime();
      map.put(id, sum);
      if (max < sum) {
        postureId = id;
        max = sum;
      }
    }

    log.info("calc map : {}", map);
    // 스트레칭 영상 내보내기
    List<Vod> length3 = vodRepository.findByLengthAndCategoryCategoryId(3, postureId - 1);
    List<Vod> length5 = vodRepository.findByLengthAndCategoryCategoryId(5, postureId - 1);
    List<Vod> length10 = vodRepository.findByLengthAndCategoryCategoryId(10, postureId - 1);

    log.info("length 3 vodList : {}", length3);
    log.info("length 5 vodList : {}", length5);
    log.info("length 10 vodList : {}", length10);

    List<VodResDto> result = new ArrayList<>();

    result.add(getRandomOne(length3));
    result.add(getRandomOne(length5));
    result.add(getRandomOne(length10));

    log.info("random vodList : {}", result);

    return result;
  }


  @Override
  public PhrasesResDto getPhrase() throws Exception {
    List<Phrases> phrasesList = phrasesRepository.findAll();
    log.info("phrasesList : {}", phrasesList);

    return getRandomPhrases(phrasesList);
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


  private VodResDto getRandomOne(List<Vod> list) {
    try {
      VodResDto vod = new VodResDto();
      Random random = new Random();
      int index = random.nextInt(list.size());
      return new VodResDto(list.get(index));
    } catch (Exception e) {
      throw new IllegalArgumentException();
    }
  }
}
