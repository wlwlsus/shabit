package com.ezpz.shabit;

import com.ezpz.shabit.admin.service.AdminServiceImpl;
import com.ezpz.shabit.info.entity.Phrases;
import com.ezpz.shabit.info.repository.PhrasesRepository;
import com.ezpz.shabit.statistics.dto.req.DailyReqDto;
import com.ezpz.shabit.statistics.entity.Posture;
import com.ezpz.shabit.statistics.repository.DailyRepository;
import com.ezpz.shabit.statistics.repository.PostureRepository;
import com.ezpz.shabit.statistics.service.StatisticsServiceImpl;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
public class StatisticsServiceTest {

    @InjectMocks
    private StatisticsServiceImpl target;
    @Mock
    private PostureRepository postureRepository;

    @Test
    public void 건강_문구_목록_조회_성공(){
        // given
        doReturn(postureList())
                .when(postureRepository)
                .findAll();

        // when
        List<Posture> postureList = target.getPostureList();

        // then
        assertThat(postureList.size()).isEqualTo(2);
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
