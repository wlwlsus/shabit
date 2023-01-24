package com.ezpz.shabit;

import com.ezpz.shabit.statistics.entity.Posture;
import com.ezpz.shabit.statistics.repository.PostureRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class PostureRepositoryTest {

    @Autowired
    private PostureRepository postureRepository;

    @Test
    public void 자세_목록_조회_성공(){
        // given
        postureRepository.save(Posture.builder()
                .name("바른 자세")
                .build());
        postureRepository.save(Posture.builder()
                .name("거북목")
                .build());

        // when
        List<Posture> postureList = postureRepository.findAll();

        //then
        assertThat(postureList.size()).isEqualTo(2);
    }



}