package com.ezpz.shabit;

import com.ezpz.shabit.admin.dto.res.SettingResDto;
import com.ezpz.shabit.admin.entity.Setting;
import com.ezpz.shabit.admin.repository.SettingRepository;
import com.ezpz.shabit.admin.service.AdminServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
public class AdminServiceTest {

    @InjectMocks
    private AdminServiceImpl target;
    @Mock
    private SettingRepository settingRepository;

    @Test
    public void 세팅_조회_성공(){
        // given
        Optional<Setting> setting = Optional.ofNullable(Setting.builder()
                .settingId(1L)
                .alertTime(5)
                .stretchingTime(50)
                .build());
        doReturn(setting)
                .when(settingRepository)
                .findById(any(Long.class));

        // when
        SettingResDto res = target.getSetting();

        // then
        assertThat(res).isNotNull();
    }

}
