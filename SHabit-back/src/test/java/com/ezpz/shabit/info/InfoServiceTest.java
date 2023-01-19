package com.ezpz.shabit.info;

import com.ezpz.shabit.info.dto.CategoryResDto;
import com.ezpz.shabit.info.entity.Category;
import com.ezpz.shabit.info.repository.CategoryRepository;
import com.ezpz.shabit.info.service.InfoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
public class InfoServiceTest {
  @Autowired
  MockMvc mockMvc;
  @Autowired
  InfoService infoService;

  @Autowired
  CategoryRepository categoryRepository;

  @BeforeEach
  void setCategoryList() {
    Category category1 = Category.builder()
                                 .categoryId(1L)
                                 .name("test 1")
                                 .build();
    Category category2 = Category.builder()
                                 .categoryId(2L)
                                 .name("test 2")
                                 .build();
    Category category3 = Category.builder()
                                 .categoryId(3L)
                                 .name("test 3")
                                 .build();
    categoryRepository.save(category1);
    categoryRepository.save(category2);
    categoryRepository.save(category3);
  }

  @Test
  @DisplayName("카테고리 목록 조회 성공 Test")
  public void getCategoryListSuccessTest() throws Exception {
    // given
    String expectedName = "test 1";
    // when
    List<CategoryResDto> result = infoService.getCategoryList();
    // then
    assertThat(result.size()).isEqualTo(3);
    assertThat(result.get(0).getName()).isEqualTo(expectedName);
  }

  @Test
  @DisplayName("카테고리 목록 조회 API 성공 Test")
  public void getCategoryListAPISuccessTest() throws Exception {
    // given
    String url = "/api/v1/info/category";
    // when
    mockMvc.perform(MockMvcRequestBuilders.get(url)
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding("UTF-8"))
            // then
            .andExpect(status().isOk());
  }

}
