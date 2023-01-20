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

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest // JPA Repository들에 대한 빈들을 등록하여 단위 테스트의 작성을 용이하게 함
@DisplayName("VodRepository 테스트")
public class VodRepositoryTest {

    @Autowired
    private VodRepository vodRepository;
    @Autowired
    private CategoryRepository categoryRepository;

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
        assertThat(vodList.size()).isEqualTo(1);
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

}

