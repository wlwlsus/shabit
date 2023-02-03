package com.ezpz.shabit;

import com.ezpz.shabit.admin.dto.YouTubeDto;
import com.ezpz.shabit.admin.service.AdminServiceImpl;
import com.ezpz.shabit.info.dto.req.PhrasesReqDto;
import com.ezpz.shabit.info.entity.Category;
import com.ezpz.shabit.info.entity.Phrases;
import com.ezpz.shabit.info.entity.Vod;
import com.ezpz.shabit.info.repository.CategoryRepository;
import com.ezpz.shabit.info.repository.PhrasesRepository;
import com.ezpz.shabit.info.repository.VodRepository;
import com.ezpz.shabit.admin.dto.req.SettingReqDto;
import com.ezpz.shabit.admin.dto.res.SettingResDto;
import com.ezpz.shabit.admin.entity.Setting;
import com.ezpz.shabit.admin.repository.SettingRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
public class AdminServiceTest {

    @InjectMocks
    private AdminServiceImpl target;
    @Mock
    private VodRepository vodRepository;
    @Mock
    private CategoryRepository categoryRepository;
    @Mock
    private SettingRepository settingRepository;
    @Mock
    private PhrasesRepository phrasesRepository;
    @Test
    public void 없는_건강_문구_삭제_실패(){
        // given
        doReturn(Phrases.builder().build()).when(phrasesRepository).findByContent(any());

        // when
        final NullPointerException exception = assertThrows(NullPointerException.class, () -> target.deletePhrases(phrasesContentList()));

        // then
        assertThat(exception.getMessage()).isEqualTo("없는 문구 입니다.");
    }

    @Test
    public void 건강_문구_삭제_성공(){
        // given
        Phrases phrases = Phrases.builder().content("blah").build();
        doReturn(phrases).when(phrasesRepository).findByContent(any());

        // when
        int res = target.deletePhrases(phrasesContentList());

        // then
        assertThat(res).isEqualTo(3);
    }

    private List<String> phrasesContentList() {
        List<String> phrasesContentList = new ArrayList<>();
        for(int i=0; i<3; i++){
            phrasesContentList.add(Integer.toString(i+1));
        }
        return phrasesContentList;
    }

//    @Test
//    public void 건강_문구_목록_조회_성공(){
//        // given
//        doReturn(phrasesList())
//                .when(phrasesRepository)
//                .findAll();
//
//        // when
//        List<Phrases> phrasesList = target.getPhrasesList(3);
//
//        // then
//        assertThat(phrasesList.size()).isEqualTo(3);
//    }

    private List<Phrases> phrasesList() {
        List<Phrases> phrasesList = new ArrayList<>();
        for(int i=0; i<3; i++){
            phrasesList.add(Phrases.builder()
                    .content("허리피세여" + Integer.toString(i))
                    .build());
        }
        return phrasesList;
    }


    @Test
    public void 없는_영상_삭제_실패(){
        // given
        doReturn(Optional.empty()).when(vodRepository).findById(any());

        // when
        final NullPointerException exception = assertThrows(NullPointerException.class, () -> target.deleteVod(vodIdList1()));

        // then
        assertThat(exception.getMessage()).isEqualTo("영상이 없습니다.");
    }

    @Test
    public void 영상_삭제_성공(){
        // given
        Optional<Vod> vod = Optional.ofNullable(Vod.builder().build());
        doReturn(vod).when(vodRepository).findById(any());

        // when
        int res = target.deleteVod(vodIdList1());

        // then
        assertThat(res).isEqualTo(3);
    }

    private List<Integer> vodIdList1() {
        List<Integer> vodIdList = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            vodIdList.add(i + 1);
        }
        return vodIdList;
    }


    @Test
    public void 영상_입력된_이름_목록_조회_성공(){
        // given
        doReturn(new PageImpl<Vod>(vodList2(), PageRequest.of(0, 2), 3))
                .when(vodRepository).findByTitleIsLike("%title%", PageRequest.of(0, 2));

        // when
        List<Vod> vodList = target.getVodList("title", "title", PageRequest.of(0, 2));

        //then
        assertThat(vodList.size()).isEqualTo(2);
    }

    @Test
    public void 영상_입력된_길이로_목록_조회_성공(){
        // given
        doReturn(new PageImpl<Vod>(vodList2(), PageRequest.of(0, 2), 3))
                .when(vodRepository)
                .findByLength(3, PageRequest.of(0, 2));

        // when
        List<Vod> vodList = target.getVodList("length", "3", PageRequest.of(0, 2));

        //then
        assertThat(vodList.size()).isEqualTo(2);
    }

    @Test
    public void 영상_입력된_카테고리_목록_조회_성공(){
        // given
        doReturn(new PageImpl<Vod>(vodList2(), PageRequest.of(0, 2), 3))
                .when(vodRepository)
                .findByCategoryCategoryId(1L, PageRequest.of(0, 2));

        // when
        List<Vod> vodList = target.getVodList("category", "1", PageRequest.of(0, 2));

        //then
        assertThat(vodList.size()).isEqualTo(2);
    }

    @Test
    public void 영상_전체_목록_조회_성공(){
        // given
        doReturn(new PageImpl<Vod>(vodList2(), PageRequest.of(0, 2), 3))
                .when(vodRepository)
                .findAll(PageRequest.of(0, 2));

        // when
        List<Vod> vodList = target.getVodList(null, null, PageRequest.of(0, 2));

        // then
        assertThat(vodList.size()).isEqualTo(2);
    }

    private List<Vod> vodList2() {
        List<Vod> vodList = new ArrayList<>();
        for(int i=0; i<2; i++){
            vodList.add(Vod.builder()
                    .vodId(1L)
                    .videoId("test url")
                    .length(3)
                    .title("test title")
                    .thumbnail("thumbnail")
                    .originalLength("12:21")
                    .category(Category.builder().name("거북"+Integer.toString(i+1)).build())
                    .build());
        }
        return vodList;
    }

    @Test
    public void 영상_중복(){
        // given
        doReturn(Vod.builder()
                .vodId(1L)
                .videoId("test url")
                .length(7)
                .originalLength("string length")
                .thumbnail("image")
                .title("test title")
                .category(Category.builder().name("거북").build())
                .build())
                .when(vodRepository)
                .findByVideoId("test url");

        // when
        DataIntegrityViolationException exception = assertThrows(DataIntegrityViolationException.class, () -> target.insertVod(YouTubeDto.builder()
                .videoId("test url")
                .length(7)
                .originalLength("string length")
                .thumbnail("image")
                .title("test title")
                .build(), 1L));

        // then
        assertThat(exception.getMessage()).isEqualTo("이미 존재하는 영상입니다.");
    }

    @Test
    public void 영상_추가_성공(){
        // given
        doReturn(null)
                .when(vodRepository)
                .findByVideoId("test url");
        doReturn(null)
                .when(vodRepository)
                .save(any(Vod.class));
        doReturn(Optional.of(Category.builder().build())).when(categoryRepository).findById(1L);

        // when
        YouTubeDto youTubeDto = YouTubeDto.builder()
                .videoId("test url")
                .length(7)
                .originalLength("string length")
                .thumbnail("image")
                .title("test title")
                .build();

        Vod vod = Vod.builder()
                .vodId(1L)
                .videoId("test url")
                .length(7)
                .originalLength("string length")
                .thumbnail("image")
                .title("test title")
                .category(Category.builder().build())
                .build();
        if(youTubeDto.getLength() < 4){
            vod.setLength(3);
        }else if(youTubeDto.getLength() < 8){
            vod.setLength(5);
        } else if(youTubeDto.getLength() < 12){
            vod.setLength(10);
        }
        int cnt = target.insertVod(youTubeDto, 1L);

        // then
        assertThat(cnt).isEqualTo(1);
        assertThat(vod.getLength()).isEqualTo(5);
    }
    @Test
    public void 초기_세팅_안돼있음(){
        // given
        SettingReqDto setting = SettingReqDto.builder()
                .alertTime(5)
                .stretchingTime(50)
                .build();
        doReturn(Optional.empty())
                .when(settingRepository)
                .findById(any(Long.class));

        // when
        NullPointerException exception = assertThrows(NullPointerException.class, () -> target.editSetting(setting));

        // then
        assertThat(exception.getMessage()).isEqualTo("초기 세팅이 되어있지 않습니다.");
    }

    @Test
    public void 세팅_수정_성공(){
        // given
        SettingReqDto setting = SettingReqDto.builder()
                .alertTime(5)
                .stretchingTime(50)
                .build();
        doReturn(null)
                .when(settingRepository)
                .save(any(Setting.class));
        doReturn(Optional.of(Setting.builder()
                .alertTime(setting.getAlertTime())
                .stretchingTime(setting.getStretchingTime()).build()))
                .when(settingRepository)
                .findById(any(Long.class));

        // when
        int cnt = target.editSetting(setting);

        // then
        assertThat(cnt).isEqualTo(1);
    }
    @Test
    public void 세팅_조회_성공(){
        // given
        Optional<Setting> setting = Optional.ofNullable(Setting.builder()
                .settingId(1L)
                .alertTime(5)
                .stretchingTime(50)
                .build());
        doReturn(setting)
                .when(settingRepository)
                .findById(any(Long.class));

        // when
        SettingResDto res = target.getSetting();

        // then
        assertThat(res).isNotNull();
    }
    @Test
    public void 건강_문구_중복(){
        // given
        doReturn(Phrases.builder()
                .content("허리 피세여")
                .build())
                .when(phrasesRepository)
                .findByContent("허리 피세여");

        // when
        int cnt = target.insertPhrases(PhrasesReqDto.builder().content("허리 피세여").build());

        // then
        assertThat(cnt).isEqualTo(0);
    }

    @Test
    public void 건강_문구_추가_성공(){
        // given
        doReturn(null)
                .when(phrasesRepository)
                .findByContent("허리 피세여");
        doReturn(null)
                .when(phrasesRepository)
                .save(any(Phrases.class));

        // when
        int cnt = target.insertPhrases(PhrasesReqDto.builder().content("허리 피세여").build());

        // then
        assertThat(cnt).isEqualTo(1);
    }


}
