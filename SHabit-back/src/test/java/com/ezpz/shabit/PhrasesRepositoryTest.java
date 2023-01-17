package com.ezpz.shabit;

import com.ezpz.shabit.info.entity.Phrases;
import com.ezpz.shabit.info.repository.PhrasesRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest // JPA Repository들에 대한 빈들을 등록하여 단위 테스트의 작성을 용이하게 함
@DisplayName("PhrasesRepository 테스트")
public class PhrasesRepositoryTest {

    @Autowired
    private PhrasesRepository phrasesRepository;

    @Test
    public void 없는_건강_문구_삭제_실패(){
        // given
        Phrases phrases = Phrases.builder()
                .phrasesId(1L)
                .content("허리 피세여")
                .build();

        // when
        Optional<Phrases> data = phrasesRepository.findById(phrases.getPhrasesId());

        //then
        assertThat(data).isEmpty();
    }

    @Test
    public void 건강_문구_삭제_성공(){
        // given
        Phrases phrases = Phrases.builder()
                        .content("허리 피세여")
                        .build();
        phrasesRepository.save(phrases);

        // when
        phrasesRepository.deleteById(phrases.getPhrasesId());

        //then
        assertThat(phrasesRepository.findById(phrases.getPhrasesId())).isEmpty();
    }

}

