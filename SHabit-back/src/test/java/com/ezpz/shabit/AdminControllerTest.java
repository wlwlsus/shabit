package com.ezpz.shabit;

import com.ezpz.shabit.admin.controller.AdminController;
import com.ezpz.shabit.admin.service.AdminServiceImpl;
import com.ezpz.shabit.info.entity.Category;
import com.ezpz.shabit.info.entity.Vod;
import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
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
    void 영상_입력된_길이로_목록_조회_성공() throws Exception{
        // given
        // findAll에 대한 stub필요
        doReturn(vodList()).when(adminService)
                .getVodList("length", "3");

        // when
        ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/admin/vods")
                        .queryParam("search", "length")
                        .queryParam("query", "3")
        );

        // then
        // HTTP Status가 OK인지 확인
        MvcResult mvcResult = resultActions.andExpect(status().isOk()).andReturn();

        // 주어진 데이터가 올바른지 검증해야하는데 Json 응답을 객체로 변환하여 확인
        System.out.println(mvcResult.getResponse().getContentAsString());
    }

    @Test
    void 영상_입력된_카테고리_목록_조회_성공() throws Exception{
        // given
        // findAll에 대한 stub필요
        doReturn(vodList()).when(adminService)
                .getVodList("category", "거북");

        // when
        ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/admin/vods")
                        .queryParam("search", "category")
                        .queryParam("query", "거북")
        );

        // then
        // HTTP Status가 OK인지 확인
        MvcResult mvcResult = resultActions.andExpect(status().isOk()).andReturn();

        // 주어진 데이터가 올바른지 검증해야하는데 Json 응답을 객체로 변환하여 확인
        System.out.println(mvcResult.getResponse().getContentAsString());
    }

    @Test
    void 영상_전체_목록_조회_성공() throws Exception{
        // given
        // findAll에 대한 stub필요
        doReturn(vodList()).when(adminService)
                .getVodList("", "");

        // when
        ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/admin/vods")
                        .queryParam("search", "")
                        .queryParam("query", "")
        );

        // then
        // HTTP Status가 OK인지 확인
        MvcResult mvcResult = resultActions.andExpect(status().isOk()).andReturn();

        // 주어진 데이터가 올바른지 검증해야하는데 Json 응답을 객체로 변환하여 확인
        System.out.println(mvcResult.getResponse().getContentAsString());
    }

    private List<Vod> vodList() {
        List<Vod> vodList = new ArrayList<>();
        for(int i=0; i<3; i++){
            vodList.add(Vod.builder()
                    .vodId(1L)
                    .url("test url")
                    .length(3)
                    .name("test title")
                    .category(Category.builder().name("거북"+Integer.toString(i+1)).build())
                    .build());
        }
        return vodList;
    }

}
