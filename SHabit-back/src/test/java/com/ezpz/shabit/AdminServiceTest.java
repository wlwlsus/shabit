package com.ezpz.shabit;

import com.ezpz.shabit.admin.dto.req.SettingReqDto;
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
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
public class AdminServiceTest {

    @InjectMocks
    private AdminServiceImpl target;
    @Mock
    private SettingRepository settingRepository;

    @Test
    public void 초기_세팅_안돼있음(){
        // given
        SettingReqDto setting = SettingReqDto.builder()
                .alertTime(5)
                .stretchingTime(50)
                .build();
        doReturn(Optional.empty())
                .when(settingRepository)
                .findById(any(Long.class));

        // when
        NullPointerException exception = assertThrows(NullPointerException.class, () -> target.editSetting(setting));

        // then
        assertThat(exception.getMessage()).isEqualTo("초기 세팅이 되어있지 않습니다.");
    }

    @Test
    public void 세팅_수정_성공(){
        // given
        SettingReqDto setting = SettingReqDto.builder()
                .alertTime(5)
                .stretchingTime(50)
                .build();
        doReturn(null)
                .when(settingRepository)
                .save(any(Setting.class));
        doReturn(Optional.of(Setting.builder()
                .alertTime(setting.getAlertTime())
                .stretchingTime(setting.getStretchingTime()).build()))
                .when(settingRepository)
                .findById(any(Long.class));

        // when
        int cnt = target.editSetting(setting);

        // then
        assertThat(cnt).isEqualTo(1);
    }

}
