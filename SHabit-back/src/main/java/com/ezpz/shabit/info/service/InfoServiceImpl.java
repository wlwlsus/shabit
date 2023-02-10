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
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
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
    if (dList == null || dList.size() == 0) {
      throw new NoSuchElementException("this email is not in database");
    }
    List<DailyCalcDto> list = dList.stream().map(DailyCalcDto::new).toList();
    log.info("daily list : {}", dList);
    log.info("daily calc list : {}", list);

    // 자세 취한 시간 계산하고, 오래 취한 순으로 정렬해서 가져오기
    PriorityQueue<Long[]> calcResult = postureCalc(list);
    log.info("calc pq : {}", calcResult);

    // 해당 카테고리 스트레칭 영상 가져오기
    List<VodResDto> result;
    result = getCategoryVods(Objects.requireNonNull(calcResult.poll()));
    // 영상 정보가 부족해서 null을 리턴 받으면 다음 우선순위로 영상 다시 요청
    while (!calcResult.isEmpty() && result == null) {
      result = getCategoryVods(Objects.requireNonNull(calcResult.poll()));
    }
    // 모든 우선순위를 돌았는대도 null이면 모든 영상에서 랜덤으로 요청
    if (result == null) {
      result = getCategoryVods(new Long[]{0L, 0L});
    }
    return result;
  }


  @Override
  public PhrasesResDto getPhrase() throws Exception {
    List<Phrases> phrasesList = phrasesRepository.findAll();
    log.info("phrasesList : {}", phrasesList);

    return getRandomPhrases(phrasesList);
  }

  private PhrasesResDto getRandomPhrases(List<Phrases> list) {
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

  // 트래킹동안 취한 자세의 시간을 계산해서 오래 취한 자세 순으로 리턴해주는 메소드
  private PriorityQueue<Long[]> postureCalc(List<DailyCalcDto> list) {
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
    }

    // 자세를 취한 시간에 따라 정렬하기
    PriorityQueue<Long[]> result = new PriorityQueue<>((p1, p2) -> p2[1].compareTo(p1[1]));
    for (Long key : map.keySet()) {
      result.offer(new Long[]{key, map.get(key)});
    }
    return result;
  }

  // 해당 카테고리 번호의 스트레칭 영상 랜덤으로 뽑아 내보내기
  private List<VodResDto> getCategoryVods(Long[] data) throws Exception {
    long categoryId = data[0] - 1;
    log.info("search category id : {}", categoryId);
    // 스트레칭 영상 찾기
    List<Vod> length3, length5, length10;
    if (categoryId > 0) {
      length3 = vodRepository.findByLengthAndCategoryCategoryId(3, categoryId - 1);
      length5 = vodRepository.findByLengthAndCategoryCategoryId(5, categoryId - 1);
      length10 = vodRepository.findByLengthAndCategoryCategoryId(10, categoryId - 1);
    } else {
      length3 = vodRepository.findByLength(3);
      length5 = vodRepository.findByLength(5);
      length10 = vodRepository.findByLength(10);
    }

    log.info("length 3 vodList : {}", length3);
    log.info("length 5 vodList : {}", length5);
    log.info("length 10 vodList : {}", length10);

    List<VodResDto> result = new ArrayList<>();

    // vod 리스트 길이 확인하기
    if (length3.size() == 0 || length5.size() == 0 || length10.size() == 0) {
      return null;
    } else {
      result.add(getRandomOne(length3));
      result.add(getRandomOne(length5));
      result.add(getRandomOne(length10));
    }
    return result;
  }

  // vod 영상중 랜덤으로 하나 뽑기
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
