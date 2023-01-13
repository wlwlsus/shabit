package com.ezpz.shabit.info;

import com.ezpz.shabit.info.dto.res.VodResDto;
import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.info.repository.VodRepository;
import com.ezpz.shabit.info.service.InfoService;
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

  @BeforeEach
  void setUpVod() {
    Vod vod1 = Vod.builder()
                       .name("목 스트레칭 테스트")
                       .category("목")
                       .url("www.abcd.neck")
                       .length(3)
                       .build();
    Vod vod2 = Vod.builder()
                       .name("어깨 스트레칭")
                       .category("어깨")
                       .url("www.abcd.shoulder")
                       .length(5)
                       .build();
    Vod vod3 = Vod.builder()
                       .name("허리 스트레칭")
                       .category("허리")
                       .url("www.abcd.waist")
                       .length(10)
                       .build();
    vodRepository.save(vod1);
    vodRepository.save(vod2);
    vodRepository.save(vod3);
    System.out.println("save successfully");
  }

  @Test
  @DisplayName("랜덤 영상 내보내기 Test")
  public void getVodListMethodSuccessTest() throws Exception {
    // given

    // when
    final List<VodResDto> list = infoService.getVodList();

    // then
    assertThat(list.get(0).getName()).isEqualTo("목 스트레칭 테스트");
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
