package com.ezpz.shabit;

import com.ezpz.shabit.info.entity.Phrases;
import com.ezpz.shabit.info.repository.PhrasesRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
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
        Optional<Phrases> data = Optional.ofNullable(phrasesRepository.findByContent(phrases.getContent()));

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
        phrasesRepository.deleteByContent(phrases.getContent());

        //then
        assertThat(phrasesRepository.findByContent(phrases.getContent())).isNull();
    }

    @Test
    public void 건강_문구_목록_조회_성공(){
        // given
        Phrases phrases = Phrases.builder()
                .content("허리 피세여")
                .build();
        phrasesRepository.save(phrases);

        // when
        List<Phrases> phrasesList = phrasesRepository.findAll();

        //then
        assertThat(phrasesList.size()).isEqualTo(1);
    }

    @Test
    public void 건강_문구_중복(){
        //given
        Phrases phrases = Phrases.builder()
                .content("허리 피세여")
                .build();
        phrasesRepository.save(phrases);

        //when
        Phrases foundPhrases = phrasesRepository.findByContent(phrases.getContent());

        //then
        assertThat(foundPhrases).isNotNull();
    }

    @Test
    public void 건강_문구_추가_성공(){
        // given
        Phrases phrases = Phrases.builder()
                .content("허리 피세여")
                .build();

        // when
        Phrases savedPhrases = phrasesRepository.save(phrases);

        //then
        assertThat(savedPhrases.getContent()).isEqualTo(phrases.getContent());
    }

}

