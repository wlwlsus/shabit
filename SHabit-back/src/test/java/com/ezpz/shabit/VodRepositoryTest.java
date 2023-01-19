package com.ezpz.shabit;

import com.ezpz.shabit.info.entity.Category;
import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.info.repository.CategoryRepository;
import com.ezpz.shabit.info.repository.VodRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest // JPA Repository들에 대한 빈들을 등록하여 단위 테스트의 작성을 용이하게 함
@DisplayName("VodRepository 테스트")
public class VodRepositoryTest {

    @Autowired
    private VodRepository vodRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    public void 영상_중복(){
        //given
        Category category = Category.builder().name("거북").build();
        categoryRepository.save(category);
        Vod vod = Vod.builder()
                .vodId(1L)
                .videoId("test url")
                .length(7)
                .originalLength("string length")
                .thumbnail("image")
                .title("test title")
                .category(category)
                .build();
        vodRepository.save(vod);

        //when
        Vod foundVod = vodRepository.findByVideoId(vod.getVideoId());

        //then
        assertThat(foundVod).isNotNull();
    }

    @Test
    public void 영상_추가_성공(){
        // given
        Category category = Category.builder().name("거북").build();
        categoryRepository.save(category);
        Vod vod = Vod.builder()
                .vodId(1L)
                .videoId("test url")
                .length(7)
                .originalLength("string length")
                .thumbnail("image")
                .title("test title")
                .category(category)
                .build();

        // when
        Vod savedVod = vodRepository.save(vod);

        //then
        assertThat(savedVod.getCategory()).isEqualTo(vod.getCategory());
        assertThat(savedVod.getVideoId()).isEqualTo(vod.getVideoId());
        assertThat(savedVod.getThumbnail()).isEqualTo(vod.getThumbnail());
        assertThat(savedVod.getOriginalLength()).isEqualTo(vod.getOriginalLength());
        assertThat(savedVod.getTitle()).isEqualTo(vod.getTitle());
        assertThat(savedVod.getLength()).isEqualTo(7);
    }

}

