package com.ezpz.shabit.admin.service;

import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.info.repository.VodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final VodRepository vodRepository;

    @Override
    public List<Vod> getVodList(String search, String query) {
        if(search == null) return vodRepository.findAll();
        return switch (search) {
            case ("category") -> vodRepository.findByCategoryName(query);
            case ("name") -> vodRepository.findByNameIsLike("%" + query + "%");
            case ("length") -> vodRepository.findByLength(Integer.parseInt(query));
            default -> vodRepository.findAll();
        };
    }

}
