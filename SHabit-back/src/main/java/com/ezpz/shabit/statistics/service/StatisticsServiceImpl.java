package com.ezpz.shabit.statistics.service;

import com.ezpz.shabit.statistics.entity.Grass;
import com.ezpz.shabit.statistics.repository.GrassRepository;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {

    private final UserRepository userRepository;
    private final GrassRepository grassRepository;

    @Override
    public List<Grass> getGrassData(String email) {
        Users user = userRepository.findByEmail(email);

        return grassRepository.findByUserEmailOrderByDateAsc(user.getEmail());
    }

}
