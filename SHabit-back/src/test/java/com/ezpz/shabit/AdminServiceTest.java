package com.ezpz.shabit;

import com.ezpz.shabit.admin.service.AdminServiceImpl;
import com.ezpz.shabit.info.dto.req.VodReqDto;
import com.ezpz.shabit.info.entity.Category;
import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.info.repository.CategoryRepository;
import com.ezpz.shabit.info.repository.VodRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
public class AdminServiceTest {

    @InjectMocks
    private AdminServiceImpl target;
    @Mock
    private VodRepository vodRepository;
    @Mock
    private CategoryRepository categoryRepository;

    @Test
    public void 영상_중복(){
        // given
        doReturn(Vod.builder()
                .vodId(1L)
                .url("test url")
                .length(3)
                .name("test title")
                .category(Category.builder().name("거북").build())
                .build())
                .when(vodRepository)
                .findByUrl("test url");
        
        // when
        int cnt = target.insertVod(VodReqDto.builder()
                .url("test url")
                .length(3)
                .name("test title")
                .categoryId(1L)
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
        doReturn(Optional.of(Category.builder().build())).when(categoryRepository).findById(1L);

        // when
        VodReqDto vod = VodReqDto.builder()
                .url("test url")
                .length(7)
                .name("test title")
                .categoryId(1L)
                .build();
        if(vod.getLength() < 4){
            vod.setLength(3);
        }else if(vod.getLength() < 8){
            vod.setLength(5);
        } else if(vod.getLength() < 12){
            vod.setLength(10);
        }
        int cnt = target.insertVod(vod);

        // then
        assertThat(cnt).isEqualTo(1);
        assertThat(vod.getLength()).isEqualTo(5);
    }

}
