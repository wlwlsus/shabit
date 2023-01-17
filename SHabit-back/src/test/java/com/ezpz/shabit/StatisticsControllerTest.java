package com.ezpz.shabit;

import com.ezpz.shabit.statistics.controller.StatisticsController;
import com.ezpz.shabit.statistics.entity.Daily;
import com.ezpz.shabit.statistics.entity.Posture;
import com.ezpz.shabit.statistics.entity.Statistics;
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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static java.time.LocalDate.now;
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

    final Posture posture = Posture.builder()
            .name("바른 자세")
            .build();
    final Users user = Users.builder()
            .email("kosy1782@gmail.com")
            .nickname("고수")
            .password("1234")
            .image(null)
            .build();
    final Statistics statistic = Statistics.builder()
            .user(user)
            .posture(posture)
            .time(30)
            .date(now())
            .build();
    @Mock
    private StatisticsServiceImpl statisticsService;
    String email = "kosy1782@gmail.com";

    @Test
    public void 오늘_데이터_일치하는_이메일_없음() throws Exception {
        // given
        final String url = "/api/v1/statistics/today/{email}";
        // StatisticsService getTodayData에 대한 stub필요
        doThrow(new NullPointerException()).when(statisticsService)
                .getTodayData("kosy1782");

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
    public void 오늘_데이터_가져오기_성공() throws Exception {
        // given
        final String url = "/api/v1/statistics/today/{email}";
        // StatisticsService getTodayData에 대한 stub필요
        doReturn(dailyList()).when(statisticsService)
                .getTodayData(email);

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

    private List<Daily> dailyList() {
        List<Daily> dailyList = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            dailyList.add(Daily.builder()
                    .user(user)
                    .posture(posture)
                    .startTime(LocalDateTime.now().minusHours(i+2))
                    .endTime(LocalDateTime.now().minusHours(i))
                    .build());
        }
        return dailyList;
    }
}
