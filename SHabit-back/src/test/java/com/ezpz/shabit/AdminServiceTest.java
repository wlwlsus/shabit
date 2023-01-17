package com.ezpz.shabit;

import com.ezpz.shabit.admin.service.AdminServiceImpl;
import com.ezpz.shabit.info.dto.req.VodReqDto;
import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.info.repository.VodRepository;
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
    private VodRepository vodRepository;

    @Test
    public void 영상_중복(){
        // given
        doReturn(Vod.builder()
                .vodId(1L)
                .url("test url")
                .length(3)
                .name("test title")
                .category("거북")
                .build())
                .when(vodRepository)
                .findByUrl("test url");

        // when
        int cnt = target.insertVod(VodReqDto.builder()
                .url("test url")
                .length(3)
                .name("test title")
                .category("거북")
                .build());

        // then
        assertThat(cnt).isEqualTo(0);
    }

    @Test
    public void 영상_추가_성공(){
        // given
        doReturn(null)
                .when(vodRepository)
                .findByUrl("test url");
        doReturn(null)
                .when(vodRepository)
                .save(any(Vod.class));

        // when
        int cnt = target.insertVod(VodReqDto.builder()
                .url("test url")
                .length(3)
                .name("test title")
                .category("거북")
                .build());

        // then
        assertThat(cnt).isEqualTo(1);
    }

}
