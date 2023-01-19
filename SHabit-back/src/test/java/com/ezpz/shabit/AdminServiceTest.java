package com.ezpz.shabit;

import com.ezpz.shabit.admin.dto.YouTubeDto;
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
import org.springframework.dao.DataIntegrityViolationException;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

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
                .videoId("test url")
                .length(7)
                .originalLength("string length")
                .thumbnail("image")
                .title("test title")
                .category(Category.builder().name("거북").build())
                .build())
                .when(vodRepository)
                .findByVideoId("test url");

        // when
        DataIntegrityViolationException exception = assertThrows(DataIntegrityViolationException.class, () -> target.insertVod(YouTubeDto.builder()
                .videoId("test url")
                .length(7)
                .originalLength("string length")
                .thumbnail("image")
                .title("test title")
                .build(), 1L));

        // then
        assertThat(exception.getMessage()).isEqualTo("이미 존재하는 영상입니다.");
    }

    @Test
    public void 영상_추가_성공(){
        // given
        doReturn(null)
                .when(vodRepository)
                .findByVideoId("test url");
        doReturn(null)
                .when(vodRepository)
                .save(any(Vod.class));
        doReturn(Optional.of(Category.builder().build())).when(categoryRepository).findById(1L);

        // when
        YouTubeDto youTubeDto = YouTubeDto.builder()
                .videoId("test url")
                .length(7)
                .originalLength("string length")
                .thumbnail("image")
                .title("test title")
                .build();

        Vod vod = Vod.builder()
                .vodId(1L)
                .videoId("test url")
                .length(7)
                .originalLength("string length")
                .thumbnail("image")
                .title("test title")
                .category(Category.builder().build())
                .build();
        if(youTubeDto.getLength() < 4){
            vod.setLength(3);
        }else if(youTubeDto.getLength() < 8){
            vod.setLength(5);
        } else if(youTubeDto.getLength() < 12){
            vod.setLength(10);
        }
        int cnt = target.insertVod(youTubeDto, 1L);

        // then
        assertThat(cnt).isEqualTo(1);
        assertThat(vod.getLength()).isEqualTo(5);
    }

}
