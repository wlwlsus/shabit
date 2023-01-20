package com.ezpz.shabit;

import com.ezpz.shabit.admin.entity.Setting;
import com.ezpz.shabit.admin.repository.SettingRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest // JPA Repository들에 대한 빈들을 등록하여 단위 테스트의 작성을 용이하게 함
@DisplayName("SettingRepository 테스트")
public class SettingRepositoryTest {

    @Autowired
    private SettingRepository settingRepository;

    @Test
    public void 세팅_조회_성공(){
        // given
        Setting setting = Setting.builder()
                .settingId(1L)
                .alertTime(5)
                .stretchingTime(50)
                .build();
        settingRepository.save(setting);

        // when
        Optional<Setting> savedSetting = settingRepository.findById(1L);

        //then
        assertThat(savedSetting.isPresent()).isEqualTo(true);
        assertThat(savedSetting.get().getAlertTime()).isEqualTo(5);
        assertThat(savedSetting.get().getStretchingTime()).isEqualTo(50);
    }

}

