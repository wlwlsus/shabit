package com.ezpz.shabit.admin.service;

import com.ezpz.shabit.admin.dto.res.SettingResDto;
import com.ezpz.shabit.admin.entity.Setting;
import com.ezpz.shabit.admin.repository.SettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final SettingRepository settingRepository;

    @Override
    public SettingResDto getSetting() {
        SettingResDto res = null;
        Setting setting = settingRepository.findById(1L).orElse(null);
        if(setting == null){
            throw new NullPointerException("초기 세팅이 되어있지 않습니다.");
        }else {
             res = SettingResDto.builder()
                    .stretchingTime(setting.getStretchingTime())
                    .alertTime(setting.getAlertTime())
                    .build();
        }
        return res;
    }
}
