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
    public void 영상_입력된_이름_목록_조회_성공(){
        // given
        doReturn(vodList()).when(vodRepository).findByNameIsLike("%title%");

        // when
        List<Vod> vodList = target.getVodList("name", "title");

        //then
        assertThat(vodList.size()).isEqualTo(3);
    }

    @Test
    public void 영상_입력된_길이로_목록_조회_성공(){
        // given
        doReturn(vodList())
                .when(vodRepository)
                .findByLength(3);

        // when
        List<Vod> vodList = target.getVodList("length", "3");

        //then
        assertThat(vodList.size()).isEqualTo(3);
    }

    @Test
    public void 영상_입력된_카테고리_목록_조회_성공(){
        // given
        doReturn(vodList())
                .when(vodRepository)
                .findByCategory("거북");

        // when
        List<Vod> vodList = target.getVodList("category", "거북");

        //then
        assertThat(vodList.size()).isEqualTo(3);
    }

    @Test
    public void 영상_전체_목록_조회_성공(){
        // given
        doReturn(vodList())
                .when(vodRepository)
                .findAll();

        // when
        List<Vod> vodList = target.getVodList(null, null);

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
