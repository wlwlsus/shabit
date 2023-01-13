package com.ezpz.shabit.info.service;

import com.ezpz.shabit.info.dto.res.VodResDto;
import com.ezpz.shabit.info.entity.Vod;
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

    list.add(getRandomOne(length3));
    list.add(getRandomOne(length5));
    list.add(getRandomOne(length10));

    log.info("random vodList : {}", list);

    return list;
  }

  private VodResDto getRandomOne(List<Vod> list) {
    VodResDto vod = new VodResDto();
    Random random = new Random();
    int index = random.nextInt(list.size());

    return new VodResDto(list.get(index));
  }
}
