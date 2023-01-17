package com.ezpz.shabit;

import com.ezpz.shabit.admin.service.AdminServiceImpl;
import com.ezpz.shabit.info.entity.Phrases;
import com.ezpz.shabit.info.repository.PhrasesRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
public class AdminServiceTest {

    @InjectMocks
    private AdminServiceImpl target;
    @Mock
    private PhrasesRepository phrasesRepository;

    @Test
    public void 건강_문구_목록_조회_성공(){
        // given
        doReturn(phrasesList())
                .when(phrasesRepository)
                .findAll();

        // when
        List<Phrases> phrasesList = target.getPhrasesList();

        // then
        assertThat(phrasesList.size()).isEqualTo(3);
    }

    private List<Phrases> phrasesList() {
        List<Phrases> phrasesList = new ArrayList<>();
        for(int i=0; i<3; i++){
            phrasesList.add(Phrases.builder()
                            .content("허리피세여" + Integer.toString(i))
                    .build());
        }
        return phrasesList;
    }

}
