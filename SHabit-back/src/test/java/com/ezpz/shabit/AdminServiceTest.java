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
    private PhrasesRepository phrasesRepository;

    @Test
    public void 없는_건강_문구_삭제_실패(){
        // given
        doReturn(Optional.empty()).when(phrasesRepository).findById(any());

        // when
        final NullPointerException exception = assertThrows(NullPointerException.class, () -> target.deletePhrases(phrasesIdList()));

        // then
        assertThat(exception.getMessage()).isEqualTo("없는 문구 입니다.");
    }

    @Test
    public void 건강_문구_삭제_성공(){
        // given
        Optional<Phrases> phrases = Optional.ofNullable(Phrases.builder().build());
        doReturn(phrases).when(phrasesRepository).findById(any());

        // when
        int res = target.deletePhrases(phrasesIdList());

        // then
        assertThat(res).isEqualTo(3);
    }

    private List<Integer> phrasesIdList() {
        List<Integer> phrasesIdList = new ArrayList<>();
        for(int i=0; i<3; i++){
            phrasesIdList.add(i+1);
        }
        return phrasesIdList;
    }

}
