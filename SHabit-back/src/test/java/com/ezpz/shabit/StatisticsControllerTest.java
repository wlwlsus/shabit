package com.ezpz.shabit;

import com.ezpz.shabit.info.entity.Phrases;
import com.ezpz.shabit.statistics.controller.StatisticsController;
import com.ezpz.shabit.statistics.entity.Grass;
import com.ezpz.shabit.statistics.entity.Posture;
import com.ezpz.shabit.statistics.entity.Statistics;
import com.ezpz.shabit.statistics.dto.req.DailyReqDto;
import com.ezpz.shabit.statistics.entity.Posture;
import com.ezpz.shabit.statistics.service.StatisticsServiceImpl;
import com.ezpz.shabit.user.entity.Users;
import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static java.time.LocalDate.now;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class) // @WebMVCTest를 이용할 수도 있지만 속도가 느리다
public class StatisticsControllerTest {

    @InjectMocks
    private StatisticsController target;

    private MockMvc mockMvc;
    private Gson gson;

    @BeforeEach // 각각의 테스트가 실행되기 전에 초기화함
    public void init() {
        gson = new Gson();
        mockMvc = MockMvcBuilders.standaloneSetup(target)
                .build();
    }

    final String email = "kosy1782@gmail.com";
    final Posture posture = Posture.builder()
            .name("바른 자세")
            .build();
    final Users user = Users.builder()
            .email("kosy1782@gmail.com")
            .nickname("고수")
            .password("1234")
            .build();
    final Statistics statistic = Statistics.builder()
            .user(user)
            .posture(posture)
            .time(30)
            .date(now())
            .build();

    @Mock
    private StatisticsServiceImpl statisticsService;

    @Test
    public void 잔디_데이터_일치하는_이메일_없음() throws Exception {
        // given
        final String url = "/api/v1/statistics/grass/{email}";
        // StatisticsService getTodayData에 대한 stub필요
        doThrow(new NullPointerException()).when(statisticsService)
                .getGrassData("kosy1782");

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.get(url, "kosy1782")
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        // HTTP Status가 NotFound인지 확인
        resultActions.andExpect(status().isNotFound());
    }

    @Test
    public void 잔디_데이터_가져오기_성공() throws Exception {
        // given
        final String url = "/api/v1/statistics/grass/{email}";
        // StatisticsService getTodayData에 대한 stub필요
        doReturn(grassList()).when(statisticsService)
                .getGrassData(email);

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.get(url, email)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        // HTTP Status가 OK인지 확인
        MvcResult mvcResult = resultActions.andExpect(status().isOk()).andReturn();
        System.out.println(mvcResult.getResponse().getContentAsString());
    }

    private List<Grass> grassList() {
        List<Grass> grassList = new ArrayList<>();
        for(int i=29; i>=0; i--){
            grassList.add(Grass.builder()
                    .user(user)
                    .date(now().minusDays(i))
                    .percentage(i*10)
                    .build());
        }
        return grassList;
    }
    @Test
    public void 주간_데이터_일치하는_이메일_없음() throws Exception {
        // given
        final String url = "/api/v1/statistics/weekly/{email}";
        // StatisticsService getWeeklyData에 대한 stub필요
        doThrow(new NullPointerException()).when(statisticsService)
                .getWeeklyData("kosy1782", -1);

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.get(url, "kosy1782")
                        .queryParam("page", "-1")
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        // HTTP Status가 NotFound인지 확인
        resultActions.andExpect(status().isNotFound());
    }

    @Test
    public void 주간_데이터_가져오기_성공() throws Exception {
        // given
        final String url = "/api/v1/statistics/weekly/{email}";
        // StatisticsService getWeeklyData에 대한 stub필요
        doReturn(statisticsList1()).when(statisticsService)
                .getWeeklyData(email, -1);

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.get(url, email)
                        .queryParam("page", "-1")
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        // HTTP Status가 OK인지 확인
        MvcResult mvcResult = resultActions.andExpect(status().isOk()).andReturn();
        System.out.println(mvcResult.getResponse().getContentAsString());
    }

    private List<Statistics> statisticsList1() {
        List<Statistics> statisticsList = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            statisticsList.add(Statistics.builder().posture(posture).user(user).date(now().minusDays(i)).time(i*10).build());
        }
        return statisticsList;
    }

    @Test
    public void 월간_데이터_일치하는_이메일_없음() throws Exception {
        // given
        final String url = "/api/v1/statistics/monthly/{email}";
        // StatisticsService getMonthlyData에 대한 stub필요
        doThrow(new NullPointerException()).when(statisticsService)
                .getMonthlyData("kosy1782", -1);

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.get(url, "kosy1782")
                        .queryParam("page", "-1")
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        // HTTP Status가 NotFound인지 확인
        resultActions.andExpect(status().isNotFound());
    }

    @Test
    public void 월간_데이터_가져오기_성공() throws Exception {
        // given
        final String url = "/api/v1/statistics/monthly/{email}";
        // StatisticsService getMonthlyData에 대한 stub필요
        doReturn(statisticsList2()).when(statisticsService)
                .getMonthlyData(email, -1);

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.get(url, email)
                        .queryParam("page", "-1")
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        // HTTP Status가 OK인지 확인
        MvcResult mvcResult = resultActions.andExpect(status().isOk()).andReturn();
        System.out.println(mvcResult.getResponse().getContentAsString());
    }

    private List<Statistics> statisticsList2() {
        List<Statistics> statisticsList = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            if(now().minusDays(i).getMonthValue() != 12) continue;
            statisticsList.add(Statistics.builder().posture(posture).user(user).date(now().minusDays(i)).time(i*10).build());
        }
        return statisticsList;
    }
    @Test
    void 자세_목록_조회_성공() throws Exception{
        // given
        // findAll에 대한 stub필요
        doReturn(postureList()).when(statisticsService)
                .getPostureList();

        // when
        ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/statistics/posture")
        );

        // then
        // HTTP Status가 OK인지 확인
        MvcResult mvcResult = resultActions.andExpect(status().isOk()).andReturn();

        // 주어진 데이터가 올바른지 검증해야하는데 Json 응답을 객체로 변환하여 확인
        System.out.println(mvcResult.getResponse().getContentAsString());
    }

    @Test
    public void 데이터_삽입_일치하는_이메일_없음() throws Exception {
        // given
        final String url = "/api/v1/statistics/{email}";
        List<DailyReqDto> req = new ArrayList<>();
        for(int i=0; i<5; i++){
            req.add(DailyReqDto.builder()
                    .postureId(1L)
                    .startTime(LocalDateTime.now().minusHours(i+2).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                    .endTime(LocalDateTime.now().minusHours(i).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                    .build());
        }
        // StatisticsService getTodayData에 대한 stub필요
        doThrow(new NullPointerException()).when(statisticsService)
                .insertTodayData(req, "kosy1782");

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.post(url, "kosy1782")
                        .content(new Gson().toJson(req))
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        // HTTP Status가 NotFound인지 확인
        resultActions.andExpect(status().isNotFound());
    }

    @Test
    public void 트래킹데이터_저장_성공() throws Exception {
        // given
        final String url = "/api/v1/statistics/{email}";
        List<DailyReqDto> req = new ArrayList<>();
        for(int i=0; i<5; i++){
            req.add(DailyReqDto.builder()
                    .postureId(1L)
                    .startTime(LocalDateTime.now().minusHours(i+2).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                    .endTime(LocalDateTime.now().minusHours(i).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                    .build());
        }

        // StatisticsService insertTodayData에 대한 stub필요
        doReturn(req.size()).when(statisticsService)
                .insertTodayData(any(), any());

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.post(url, email)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new Gson().toJson(req))
        );

        // then
        // HTTP Status가 OK인지 확인
        MvcResult mvcResult = resultActions.andExpect(status().isOk()).andReturn();
        System.out.println(mvcResult.getResponse().getContentAsString());
    }


    private List<Posture> postureList() {
        List<Posture> postureList = new ArrayList<>();
        postureList.add(Posture.builder()
                .name("바른 자세")
                .build());
        postureList.add(Posture.builder()
                .name("거북목")
                .build());
        return postureList;
    }

}
