package com.ezpz.shabit.info;

import com.ezpz.shabit.info.dto.res.VodResDto;
import com.ezpz.shabit.info.entity.Category;
import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.info.repository.CategoryRepository;
import com.ezpz.shabit.info.repository.VodRepository;
import com.ezpz.shabit.info.service.InfoService;
import com.ezpz.shabit.statistics.entity.Daily;
import com.ezpz.shabit.statistics.entity.Posture;
import com.ezpz.shabit.statistics.repository.DailyRepository;
import com.ezpz.shabit.statistics.repository.PostureRepository;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
public class InfoServiceTest {

  @Autowired
  private MockMvc mockMvc;
  @Autowired
  private InfoService infoService;
  @Autowired
  private VodRepository vodRepository;
  @Autowired
  private DailyRepository dailyRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private PostureRepository postureRepository;
  @Autowired
  private CategoryRepository categoryRepository;

  private final Users user = Users.builder()
                                     .email("ssafy@ssafy.com")
                                     .nickname("김싸피")
                                     .password("1234")
                                     .build();
  private final Posture posture1 = Posture.builder()
                                           .name("바른")
                                           .build();
  private final Posture posture2 = Posture.builder()
                                           .name("거북목")
                                           .build();


  @BeforeEach
  void setUpVod() {
    Category category = Category.builder()
                                .name("목")
                                .build();
    categoryRepository.save(category);
    System.out.println("saved category successfully");

    Vod vod1 = Vod.builder()
                       .title("목 테스트")
                       .videoId("AVBC1")
                       .originalLength("")
                       .thumbnail("ddd")
                       .category(category)
                       .length(3)
                       .build();

    Vod vod2 = Vod.builder()
                       .title("목 테스트1")
                       .videoId("AVBC1")
                       .originalLength("")
                       .thumbnail("ddd")
                       .category(category)
                       .length(5)
                       .build();

    Vod vod3 = Vod.builder()
                       .title("목 테스트2")
                       .videoId("AVBC1")
                       .originalLength("")
                       .thumbnail("ddd")
                       .category(category)
                       .length(10)
                       .build();
    vodRepository.save(vod1);
    vodRepository.save(vod2);
    vodRepository.save(vod3);
    System.out.println("saved vods successfully");
  }

  @BeforeEach
  void setDaily() {
    userRepository.save(user);
    System.out.println("saved user successfully");

    postureRepository.save(posture1);
    postureRepository.save(posture2);
    System.out.println("saved posture successfully");
//    LocalDateTime.of(2023, 1, 19, 22, 29, 30)
    Daily daily1 = Daily.builder()
                           .posture(posture2)
                           .endTime(LocalDateTime.now().plusHours(1))
                           .startTime(LocalDateTime.now().plusMinutes(47))
                           .user(user)
                           .build();
    Daily daily2 = Daily.builder()
                           .posture(posture2)
                           .endTime(LocalDateTime.now().plusHours(2))
                           .startTime(LocalDateTime.now().plusHours(1).plusMinutes(25))
                           .user(user)
                           .build();
    Daily daily3 = Daily.builder()
                           .posture(posture2)
                           .endTime(LocalDateTime.now().plusHours(3))
                           .startTime(LocalDateTime.now().plusHours(2).plusMinutes(14))
                           .user(user)
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
    String email = "ssafy@ssafy.com";
    // when
    final List<VodResDto> list = infoService.getVodList(email);

    // then
    assertThat(list.get(0).getTitle()).isEqualTo("목 테스트");
  }

  @Test
  @DisplayName("랜덤 영상 내보내기 실패 Test")
  public void getVodListMethodSuccessFailTest() {
    // given
    String email = "ssafy@ssafy.com";
    Posture posture = Posture.builder()
                              .postureId(3L)
                              .name("누운 자세")
                              .build();
    postureRepository.save(posture);
    Daily daily = Daily.builder()
                          .posture(posture)
                          .endTime(LocalDateTime.now().plusHours(3))
                          .startTime(LocalDateTime.now())
                          .user(user)
                          .build();
    dailyRepository.save(daily);
    // when

    // then
    assertThrows(IllegalArgumentException.class, () -> infoService.getVodList(email));
  }

  @Test
  @DisplayName("랜덤 영상 내보내기 API Test")
  public void getVodListMethodAPITest() throws Exception {
    // given
    String url = "/api/v1/info/vods/ssafy@ssafy.com";
    // when
    mockMvc.perform(MockMvcRequestBuilders.get(url)
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding("UTF-8"))
            // then
            .andExpect(status().isOk());
  }

}
