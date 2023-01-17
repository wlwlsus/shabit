package com.ezpz.shabit;

import com.ezpz.shabit.admin.controller.AdminController;
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

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.doReturn;
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
    public void 없는_영상_삭제_실패() throws Exception {
        // given
        List<Integer> list = vodIdList();
        doReturn(0).when(adminService)
                .deleteVod(list);

        // when
        ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/v1/admin/vods")
                        .content(gson.toJson(list))
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        // HTTP Status가 OK인지 확인
        MvcResult mvcResult = resultActions.andExpect(status().isNotFound()).andReturn();

        // 주어진 데이터가 올바른지 검증해야하는데 Json 응답을 객체로 변환하여 확인
        System.out.println(mvcResult.getResponse().getContentAsString());
    }

    @Test
    void 영상_삭제_성공() throws Exception{
        // given
        List<Integer> list = vodIdList();
        doReturn(3).when(adminService)
                .deleteVod(list);

        // when
        ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/v1/admin/vods")
                        .content(gson.toJson(list))
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        // HTTP Status가 OK인지 확인
        MvcResult mvcResult = resultActions.andExpect(status().isOk()).andReturn();

        // 주어진 데이터가 올바른지 검증해야하는데 Json 응답을 객체로 변환하여 확인
        System.out.println(mvcResult.getResponse().getContentAsString());
    }

    private List<Integer> vodIdList() {
        List<Integer> vodIdList = new ArrayList<>();
        for(int i=0; i<3; i++){
            vodIdList.add(i+1);
        }
        return vodIdList;
    }

}
