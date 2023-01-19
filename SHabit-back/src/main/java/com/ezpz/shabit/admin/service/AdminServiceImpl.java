package com.ezpz.shabit.admin.service;

import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.info.repository.VodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.InputMismatchException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final VodRepository vodRepository;

    @Override
    public List<Vod> getVodList(String search, String query) {
        if(search == null) return vodRepository.findAll();
        List<Integer> lengthList = List.of(3, 5, 10);
        return switch (search) {
            case ("category") -> vodRepository.findByCategoryName(query);
            case ("title") -> vodRepository.findByTitleIsLike("%" + query + "%");
            case ("length") -> {
                if(!lengthList.contains(Integer.parseInt(query)))
                    throw new InputMismatchException("검색 가능한 영상 길이는 3, 5, 10입니다.");
                yield vodRepository.findByLength(Integer.parseInt(query));
            }
            default -> vodRepository.findAll();
        };
    }

}
