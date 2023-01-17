package com.ezpz.shabit;

import com.ezpz.shabit.admin.controller.AdminController;
import com.ezpz.shabit.admin.service.AdminServiceImpl;
import com.ezpz.shabit.info.dto.req.PhrasesReqDto;
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
    public void 건강_문구_중복() throws Exception {
        // given
        final String url = "/api/v1/admin/phrase";
        PhrasesReqDto req = PhrasesReqDto.builder().content("허리 피세여").build();
        doReturn(0).when(adminService)
                .insertPhrases(any(PhrasesReqDto.class));

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.post(url)
                        .content(new Gson().toJson(req))
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        // HTTP Status가 NotFound인지 확인
        resultActions.andExpect(status().isNotFound());
    }

    @Test
    public void 건강_문구_추가_성공() throws Exception {
        // given
        final String url = "/api/v1/admin/phrase";
        PhrasesReqDto req = PhrasesReqDto.builder().content("허리 피세여").build();
        doReturn(1).when(adminService)
                .insertPhrases(any(PhrasesReqDto.class));

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.post(url)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new Gson().toJson(req))
        );

        // then
        // HTTP Status가 OK인지 확인
        MvcResult mvcResult = resultActions.andExpect(status().isOk()).andReturn();
        System.out.println(mvcResult.getResponse().getContentAsString());
    }

}
