package com.ezpz.shabit;

import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.info.repository.VodRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest // JPA Repository들에 대한 빈들을 등록하여 단위 테스트의 작성을 용이하게 함
@DisplayName("VodRepository 테스트")
public class VodRepositoryTest {

    @Autowired
    private VodRepository vodRepository;

    @Test
    public void 없는_영상_삭제_실패(){
        // given
        Vod vod = Vod.builder()
                .vodId(1L)
                .url("test url")
                .length(3)
                .name("test title")
                .category("거북")
                .build();

        // when
        Optional<Vod> data = vodRepository.findById(vod.getVodId());

        //then
        assertThat(data).isEmpty();
    }

    @Test
    public void 영상_삭제_성공(){
        // given
        Vod vod = Vod.builder()
                .vodId(1L)
                .url("test url")
                .length(3)
                .name("test title")
                .category("거북")
                .build();
        vodRepository.save(vod);

        // when
        vodRepository.deleteById(vod.getVodId());

        //then
        assertThat(vodRepository.findById(vod.getVodId())).isEmpty();
    }

}

