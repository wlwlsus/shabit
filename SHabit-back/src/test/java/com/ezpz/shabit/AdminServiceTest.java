package com.ezpz.shabit;

import com.ezpz.shabit.admin.service.AdminServiceImpl;
import com.ezpz.shabit.info.dto.req.PhrasesReqDto;
import com.ezpz.shabit.info.entity.Phrases;
import com.ezpz.shabit.info.repository.PhrasesRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
public class AdminServiceTest {

    @InjectMocks
    private AdminServiceImpl target;
    @Mock
    private PhrasesRepository phrasesRepository;


    @Test
    public void 건강_문구_중복(){
        // given
        doReturn(Phrases.builder()
                .content("허리 피세여")
                .build())
                .when(phrasesRepository)
                .findByContent("허리 피세여");

        // when
        int cnt = target.insertPhrases(PhrasesReqDto.builder().content("허리 피세여").build());

        // then
        assertThat(cnt).isEqualTo(0);
    }

    @Test
    public void 건강_문구_추가_성공(){
        // given
        doReturn(null)
                .when(phrasesRepository)
                .findByContent("허리 피세여");
         doReturn(null)
                .when(phrasesRepository)
                .save(any(Phrases.class));

        // when
        int cnt = target.insertPhrases(PhrasesReqDto.builder().content("허리 피세여").build());

        // then
        assertThat(cnt).isEqualTo(1);
    }

}
