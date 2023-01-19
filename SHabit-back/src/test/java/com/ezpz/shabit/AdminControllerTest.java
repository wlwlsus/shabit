package com.ezpz.shabit;

import com.ezpz.shabit.admin.controller.AdminController;
import com.ezpz.shabit.admin.dto.req.SettingReqDto;
import com.ezpz.shabit.admin.service.AdminServiceImpl;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class) // @WebMVCTest를 이용할 수도 있지만 속도가 느리다
public class AdminControllerTest {

    @InjectMocks
    private AdminController target;

    private MockMvc mockMvc;
    private Gson gson;

    @BeforeEach // 각각의 테스트가 실행되기 전에 초기화함
    public void init() {
        gson = new Gson();
        mockMvc = MockMvcBuilders.standaloneSetup(target)
                .build();
    }

    @Mock
    private AdminServiceImpl adminService;

    @Test
    public void 초기_세팅_안돼있음() throws Exception {
        // given
        final String url = "/api/v1/admin/alarm";
        SettingReqDto req = SettingReqDto.builder()
                .alertTime(5)
                .stretchingTime(50)
                .build();
        doThrow(new NullPointerException("초기 세팅이 되어있지 않습니다."))
                .when(adminService)
                .editSetting(any(SettingReqDto.class));

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.put(url)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new Gson().toJson(req))
        );

        // then
        // HTTP Status가 OK인지 확인
        MvcResult mvcResult = resultActions.andExpect(status().isNotFound()).andReturn();
    }

    @Test
    public void 세팅_수정_성공() throws Exception {
        // given
        final String url = "/api/v1/admin/alarm";
        SettingReqDto req = SettingReqDto.builder()
                .alertTime(5)
                .stretchingTime(50)
                .build();
        doReturn(1).when(adminService)
                .editSetting(any(SettingReqDto.class));

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.put(url)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new Gson().toJson(req))
        );

        // then
        // HTTP Status가 OK인지 확인
        MvcResult mvcResult = resultActions.andExpect(status().isOk()).andReturn();
    }

}
