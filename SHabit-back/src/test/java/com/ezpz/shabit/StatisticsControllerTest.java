package com.ezpz.shabit;

import com.ezpz.shabit.info.entity.Phrases;
import com.ezpz.shabit.statistics.controller.StatisticsController;
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

    @Mock
    private StatisticsServiceImpl statisticsService;

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
