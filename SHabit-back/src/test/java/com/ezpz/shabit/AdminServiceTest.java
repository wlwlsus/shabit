package com.ezpz.shabit;

import com.ezpz.shabit.admin.service.AdminServiceImpl;
import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.info.repository.VodRepository;
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
    private VodRepository vodRepository;

    @Test
    public void 없는_영상_삭제_실패(){
        // given
        doReturn(Optional.empty()).when(vodRepository).findById(any());

        // when
        final NullPointerException exception = assertThrows(NullPointerException.class, () -> target.deleteVod(vodIdList()));

        // then
        assertThat(exception.getMessage()).isEqualTo("없는 문구 입니다.");
    }

    @Test
    public void 영상_삭제_성공(){
        // given
        Optional<Vod> vod = Optional.ofNullable(Vod.builder().build());
        doReturn(vod).when(vodRepository).findById(any());

        // when
        int res = target.deleteVod(vodIdList());

        // then
        assertThat(res).isEqualTo(3);
    }

    private List<Integer> vodIdList() {
        List<Integer> vodIdList = new ArrayList<>();
        for(int i=0; i<3; i++){
            vodIdList.add(i+1);
        }
        return vodIdList;
    }

}
