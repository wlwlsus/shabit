package com.ezpz.shabit;

import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.info.repository.VodRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest // JPA Repository들에 대한 빈들을 등록하여 단위 테스트의 작성을 용이하게 함
@DisplayName("VodRepository 테스트")
public class VodRepositoryTest {

    @Autowired
    private VodRepository vodRepository;


    @Test
    public void 영상_중복(){
        //given
        Vod vod = Vod.builder()
                .vodId(1L)
                .url("test url")
                .length(3)
                .name("test title")
                .category("거북")
                .build();
        vodRepository.save(vod);

        //when
        Vod foundVod = vodRepository.findByUrl(vod.getUrl());

        //then
        assertThat(foundVod).isNotNull();
    }

    @Test
    public void 영상_추가_성공(){
        // given
        Vod vod = Vod.builder()
                .vodId(1L)
                .url("test url")
                .length(3)
                .name("test title")
                .category("거북")
                .build();

        // when
        Vod savedVod = vodRepository.save(vod);

        //then
        assertThat(savedVod.getCategory()).isEqualTo(vod.getCategory());
        assertThat(savedVod.getUrl()).isEqualTo(vod.getUrl());
        assertThat(savedVod.getName()).isEqualTo(vod.getName());
        assertThat(savedVod.getLength()).isEqualTo(vod.getLength());
    }




}

