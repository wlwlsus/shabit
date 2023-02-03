package com.ezpz.shabit;

import com.ezpz.shabit.admin.controller.AdminController;
import com.ezpz.shabit.admin.dto.res.SettingResDto;
import com.ezpz.shabit.admin.service.AdminServiceImpl;
import com.ezpz.shabit.info.dto.req.PhrasesReqDto;
import com.ezpz.shabit.info.entity.Category;
import com.ezpz.shabit.info.entity.Phrases;
import com.ezpz.shabit.info.entity.Vod;
import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

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
    public void 없는_영상_삭제_실패() throws Exception {
        // given
        List<Integer> list = vodIdList1();
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
        List<Integer> list = vodIdList1();
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

    private List<Integer> vodIdList1() {
        List<Integer> vodIdList = new ArrayList<>();
        for(int i=0; i<3; i++){
            vodIdList.add(i+1);
        }
        return vodIdList;
    }

//    @Test
//    void 영상_입력된_길이로_목록_조회_성공() throws Exception{
//        // given
//        // findAll에 대한 stub필요
//        doReturn(vodList())
//                .when(adminService)
//                .getVodList("length", "3", PageRequest.of(0, 2));
//
//        // when
//        ResultActions resultActions = mockMvc.perform(
//                MockMvcRequestBuilders.get("/api/v1/admin/vods")
//                        .queryParam("search", "length")
//                        .queryParam("query", "3")
//                        .queryParam("page", "0")
//                        .queryParam("size", "10")
//        );
//
//        // then
//        // HTTP Status가 OK인지 확인
//        MvcResult mvcResult = resultActions.andExpect(status().isOk()).andReturn();
//
//        // 주어진 데이터가 올바른지 검증해야하는데 Json 응답을 객체로 변환하여 확인
//        System.out.println(mvcResult.getResponse().getContentAsString());
//    }

//    @Test
//    void 영상_입력된_카테고리_목록_조회_성공() throws Exception{
//        // given
//        // findAll에 대한 stub필요
//        doReturn(vodList())
//                .when(adminService)
//                .getVodList("category", "거북", PageRequest.of(0, 2));
//
//        // when
//        ResultActions resultActions = mockMvc.perform(
//                MockMvcRequestBuilders.get("/api/v1/admin/vods")
//                        .queryParam("search", "category")
//                        .queryParam("query", "거북")
//                        .queryParam("page", "0")
//                        .queryParam("size", "10")
//        );
//
//        // then
//        // HTTP Status가 OK인지 확인
//        MvcResult mvcResult = resultActions.andExpect(status().isOk()).andReturn();
//
//        // 주어진 데이터가 올바른지 검증해야하는데 Json 응답을 객체로 변환하여 확인
//        System.out.println(mvcResult.getResponse().getContentAsString());
//    }

//    @Test
//    void 영상_전체_목록_조회_성공() throws Exception{
//        // given
//        // findAll에 대한 stub필요
//        doReturn(vodList())
//                .when(adminService)
//                .getVodList("", "", PageRequest.of(0, 2));
//
//        // when
//        ResultActions resultActions = mockMvc.perform(
//                MockMvcRequestBuilders.get("/api/v1/admin/vods")
//                        .queryParam("search", "")
//                        .queryParam("query", "")
//                        .queryParam("page", "0")
//                        .queryParam("size", "2")
//        );
//
//        // then
//        // HTTP Status가 OK인지 확인
//        MvcResult mvcResult = resultActions.andExpect(status().isOk()).andReturn();
//
//        // 주어진 데이터가 올바른지 검증해야하는데 Json 응답을 객체로 변환하여 확인
//        System.out.println(mvcResult.getResponse().getContentAsString());
//    }

    private List<Vod> vodList() {
        List<Vod> vodList = new ArrayList<>();
        for(int i=0; i<3; i++){
            vodList.add(Vod.builder()
                    .vodId(1L)
                    .videoId("test url")
                    .length(3)
                    .title("test title")
                    .thumbnail("thumbnail")
                    .originalLength("12:21")
                    .category(Category.builder().name("거북" + Integer.toString(i + 1)).build())
                    .build());
        }
        return vodList;
    }

    @Test
    public void 세팅_조회_성공() throws Exception {
        // given
        final String url = "/api/v1/admin/alarm";
        SettingResDto res = SettingResDto.builder()
                .alertTime(5)
                .stretchingTime(50)
                .build();
        doReturn(res)
                .when(adminService)
                .getSetting();

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.get(url)
        );

        // then
        // HTTP Status가 OK인지 확인
        MvcResult mvcResult = resultActions.andExpect(status().isOk()).andReturn();
        System.out.println(mvcResult.getResponse().getContentAsString());
    }

    @Test
    public void 없는_건강_문구_삭제_실패() throws Exception {
        // given
        List<String> list = phrasesContentList();
        doThrow(new NullPointerException("존재하지않는 문구 입니다.")).when(adminService)
                .deletePhrases(list);

        // when
        ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/v1/admin/phrase")
                        .content(gson.toJson(list))
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        // HTTP Status가 OK인지 확인
        MvcResult mvcResult = resultActions.andExpect(status().isBadRequest()).andReturn();

        // 주어진 데이터가 올바른지 검증해야하는데 Json 응답을 객체로 변환하여 확인
        System.out.println(mvcResult.getResponse().getContentAsString());
    }

    @Test
    void 건강_문구_삭제_성공() throws Exception{
        // given
        List<String> list = phrasesContentList();
        doReturn(3).when(adminService)
                .deletePhrases(list);

        // when
        ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/v1/admin/phrase")
                        .content(gson.toJson(list))
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        // HTTP Status가 OK인지 확인
        MvcResult mvcResult = resultActions.andExpect(status().isOk()).andReturn();

        // 주어진 데이터가 올바른지 검증해야하는데 Json 응답을 객체로 변환하여 확인
        System.out.println(mvcResult.getResponse().getContentAsString());
    }

    private List<String> phrasesContentList() {
        List<String> phrasesContentList = new ArrayList<>();
        for(int i=0; i<3; i++){
            phrasesContentList.add(Integer.toString(i+1));
        }
        return phrasesContentList;
    }

//    @Test
//    void 건강_문구_목록_조회_성공() throws Exception{
//        // given
//        // findAll에 대한 stub필요
//        doReturn(phrasesList()).when(adminService)
//                .getPhrasesList();
//
//        // when
//        ResultActions resultActions = mockMvc.perform(
//                MockMvcRequestBuilders.get("/api/v1/admin/phrase")
//        );
//
//        // then
//        // HTTP Status가 OK인지 확인
//        MvcResult mvcResult = resultActions.andExpect(status().isOk()).andReturn();
//
//        // 주어진 데이터가 올바른지 검증해야하는데 Json 응답을 객체로 변환하여 확인
//        System.out.println(mvcResult.getResponse().getContentAsString());
//    }

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

    private List<Phrases> phrasesList() {
        List<Phrases> phrasesList = new ArrayList<>();
        for(int i=0; i<3; i++){
            phrasesList.add(Phrases.builder()
                    .content("허리피세여" + Integer.toString(i))
                    .build());
        }
        return phrasesList;
    }


}
