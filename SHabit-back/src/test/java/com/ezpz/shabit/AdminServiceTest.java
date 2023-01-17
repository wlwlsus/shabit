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

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
public class AdminServiceTest {

    @InjectMocks
    private AdminServiceImpl target;
    @Mock
    private VodRepository vodRepository;

    @Test
    public void 영상_목록_조회_성공(){
        // given
        doReturn(vodList())
                .when(vodRepository)
                .findAll();

        // when
        List<Vod> vodList = target.getVodList();

        // then
        assertThat(vodList.size()).isEqualTo(3);
    }

    private List<Vod> vodList() {
        List<Vod> vodList = new ArrayList<>();
        for(int i=0; i<3; i++){
            vodList.add(Vod.builder()
                    .vodId(1L)
                    .url("test url")
                    .length(3)
                    .name("test title")
                    .category("거북")
                    .build());
        }
        return vodList;
    }


}
