package com.ezpz.shabit.admin.service;

import com.ezpz.shabit.info.repository.VodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final VodRepository vodRepository;

    @Override
    public int deleteVod(List<Integer> vodIdList) {
        vodIdList.forEach(i -> {
                if(vodRepository.findById(Integer.toUnsignedLong(i)).isEmpty()){
                    throw new NullPointerException("영상이 없습니다.");
                }
                vodRepository.deleteById(Integer.toUnsignedLong(i));});
        return vodIdList.size();
    }
}
