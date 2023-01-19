package com.ezpz.shabit.info;

import com.ezpz.shabit.info.dto.res.DailyCalcDto;
import com.ezpz.shabit.info.dto.res.VodResDto;
import com.ezpz.shabit.info.entity.Category;
import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.info.repository.VodRepository;
import com.ezpz.shabit.info.service.InfoService;
import com.ezpz.shabit.statistics.entity.Daily;
import com.ezpz.shabit.statistics.entity.Posture;
import com.ezpz.shabit.statistics.repository.DailyRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
public class InfoServiceTests {

  @Autowired
  private MockMvc mockMvc;
  @Autowired
  private InfoService infoService;
  @Autowired
  private VodRepository vodRepository;
  @Autowired
  private DailyRepository dailyRepository;

  @BeforeEach
  void setUpVod() {
    Vod vod1 = Vod.builder()
                       .title("목 테스트")
                       .category(new Category(1L, "목"))
                       .length(3)
                       .build();

    Vod vod2 = Vod.builder()
                       .title("목 테스트1")
                       .category(new Category(1L, "목"))
                       .length(5)
                       .build();

    Vod vod3 = Vod.builder()
                       .title("목 테스트2")
                       .category(new Category(1L, "목"))
                       .length(10)
                       .build();
    vodRepository.save(vod1);
    vodRepository.save(vod2);
    vodRepository.save(vod3);
    System.out.println("saved vods successfully");
  }

  @BeforeEach
  void setDaily() {
    Daily daily1 = Daily.builder()
                           .endTime(LocalDateTime.of(2023, 1, 19, 22, 29, 30))
                           .startTime(LocalDateTime.of(2023, 1, 19, 19, 20, 30))
                           .posture(new Posture(1L, "거북목"))
                           .build();
    Daily daily2 = Daily.builder()
                           .endTime(LocalDateTime.of(2023, 1, 19, 19, 20, 30))
                           .startTime(LocalDateTime.of(2023, 1, 19, 19, 10, 30))
                           .posture(new Posture(2L, "거북목"))
                           .build();
    Daily daily3 = Daily.builder()
                           .endTime(LocalDateTime.of(2023, 1, 19, 19, 10, 30))
                           .startTime(LocalDateTime.of(2023, 1, 19, 18, 3, 30))
                           .posture(new Posture(3L, "거북목"))
                           .build();
    dailyRepository.save(daily1);
    dailyRepository.save(daily2);
    dailyRepository.save(daily3);
    System.out.println("saved daily successfully");
  }

  @Test
  @DisplayName("랜덤 영상 내보내기 Test")
  public void getVodListMethodSuccessTest() throws Exception {
    // given

    // when
    final List<VodResDto> list = infoService.getVodList("dd");

    // then
    assertThat(list.get(0).getTitle()).isEqualTo("목 테스트");
  }

  @Test
  @DisplayName("랜덤 영상 내보내기 API Test")
  public void getVodListMethodAPITest() throws Exception {
    // given
    String url = "/api/v1/vods";
    // when
    mockMvc.perform(MockMvcRequestBuilders.get(url)
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding("UTF-8"))
            // then
            .andExpect(status().isOk());
  }

}
