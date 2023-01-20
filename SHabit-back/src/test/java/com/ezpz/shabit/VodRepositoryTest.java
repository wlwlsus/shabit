package com.ezpz.shabit;

import com.ezpz.shabit.info.entity.Category;
import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.info.repository.CategoryRepository;
import com.ezpz.shabit.info.repository.VodRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest // JPA Repository들에 대한 빈들을 등록하여 단위 테스트의 작성을 용이하게 함
@DisplayName("VodRepository 테스트")
public class VodRepositoryTest {

    @Autowired
    private VodRepository vodRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    final Category category = Category.builder()
            .name("거북")
            .build();

    @Test
    public void 영상_입력된_이름_목록_조회_성공(){
        // given
        Category category1 = Category.builder().name("거북").build();
        Category category2 = Category.builder().name("거북이").build();
        categoryRepository.save(category1);
        categoryRepository.save(category2);
        vodRepository.save(Vod.builder()
                .vodId(1L)
                .videoId("test url")
                .length(3)
                .title("test title")
                .thumbnail("thumbnail")
                .category(category1)
                .originalLength("12:21")
                .build());
        vodRepository.save(Vod.builder()
                .vodId(2L)
                .videoId("test url2")
                .length(3)
                .title("test title2")
                .thumbnail("thumbnail2")
                .category(category2)
                .originalLength("12:21")
                .build());

        // when
        List<Vod> vodList = vodRepository.findByTitleIsLike("%title%");

        //then
        assertThat(vodList.size()).isEqualTo(2);
    }

    @Test
    public void 영상_입력된_길이로_목록_조회_성공(){
        // given
        Category category1 = Category.builder().name("거북").build();
        Category category2 = Category.builder().name("거북이").build();
        categoryRepository.save(category1);
        categoryRepository.save(category2);
        vodRepository.save(Vod.builder()
                .vodId(1L)
                .videoId("test url")
                .length(3)
                .title("test title")
                .thumbnail("thumbnail")
                .category(category1)
                .originalLength("12:21")
                .build());
        vodRepository.save(Vod.builder()
                .vodId(2L)
                .videoId("test url2")
                .length(3)
                .title("test title2")
                .thumbnail("thumbnail2")
                .category(category2)
                .originalLength("12:21")
                .build());

        // when
        List<Vod> vodList = vodRepository.findByLength(3);

        //then
        assertThat(vodList.size()).isEqualTo(2);
    }

    @Test
    public void 영상_입력된_카테고리_목록_조회_성공(){
        // given
        Category category1 = Category.builder().name("거북").build();
        Category category2 = Category.builder().name("거북이").build();
        categoryRepository.save(category1);
        categoryRepository.save(category2);
        vodRepository.save(Vod.builder()
                .vodId(1L)
                .videoId("test url")
                .length(3)
                .title("test title")
                .thumbnail("thumbnail")
                .category(category1)
                .originalLength("12:21")
                .build());
        vodRepository.save(Vod.builder()
                .vodId(2L)
                .videoId("test url2")
                .length(3)
                .title("test title2")
                .thumbnail("thumbnail2")
                .category(category2)
                .originalLength("12:21")
                .build());

        // when
        List<Vod> vodList = vodRepository.findByCategoryName("거북");

        //then
        assertThat(vodList.size()).isEqualTo(1);
    }

    @Test
    public void 영상_전체_목록_조회_성공(){
        // given
        Category category = Category.builder().name("거북").build();
        categoryRepository.save(category);
        Vod vod = Vod.builder()
                .vodId(1L)
                .videoId("test url")
                .length(3)
                .title("test title")
                .thumbnail("thumbnail")
                .category(category)
                .originalLength("12:21")
                .build();
        vodRepository.save(vod);

        // when
        List<Vod> vodList = vodRepository.findAll();

        //then
        assertThat(vodList.size()).isEqualTo(1);
    }

    @Test
    public void 없는_영상_삭제_실패(){
        // given
        Vod vod = Vod.builder()
                .vodId(1L)
                .videoId("test url")
                .length(3)
                .title("test title")
                .thumbnail("thumbnail")
                .category(category)
                .originalLength("12:21")
                .build();

        // when
        Optional<Vod> data = vodRepository.findById(vod.getVodId());

        //then
        assertThat(data).isEmpty();
    }

    @Test
    public void 영상_삭제_성공(){
        // given
        categoryRepository.save(category);
        Vod vod = Vod.builder()
                .videoId("test url")
                .length(3)
                .title("test title")
                .thumbnail("thumbnail")
                .category(category)
                .originalLength("12:21")
                .build();
        vodRepository.save(vod);

        // when
        vodRepository.deleteById(vod.getVodId());

        //then
        assertThat(vodRepository.findById(vod.getVodId())).isEmpty();
    }
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

