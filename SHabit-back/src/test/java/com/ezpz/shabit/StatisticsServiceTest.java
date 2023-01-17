package com.ezpz.shabit;

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
    private DailyRepository dailyRepository;
    @Mock
    private PostureRepository postureRepository;
    @Mock
    private UserRepository userRepository;

    private final String email = "kosy1782@gmail.com";

    final Users user = Users.builder()
            .email("kosy1782@gmail.com")
            .nickname("고수")
            .password("1234")
            .image(null)
            .build();
    final Posture posture = Posture.builder()
            .name("바른 자세").build();

    @Test
    public void 트래킹_데이터_입력_일치하는_이메일_없음(){
        // given
        List<DailyReqDto> req = new ArrayList<>();
        for(int i=0; i<5; i++){
            req.add(DailyReqDto.builder()
                    .posture("바른 자세")
                    .startTime(LocalDateTime.now().minusHours(i+2).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                    .endTime(LocalDateTime.now().minusHours(i).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                    .build());
        }

        doReturn(null).when(userRepository)
                .findByEmail("kosy1782");

        // when
        final NullPointerException exception = assertThrows(NullPointerException.class, () -> target.insertTodayData(req, "kosy1782"));

        // then
        assertThat(exception.getMessage()).isEqualTo("Cannot invoke \"com.ezpz.shabit.user.entity.Users.getEmail()\" because \"user\" is null");
    }


    @Test
    public void 트래킹데이터_저장_성공(){
        // given
        List<DailyReqDto> req = new ArrayList<>();
        for(int i=0; i<5; i++){
            req.add(DailyReqDto.builder()
                    .posture("바른 자세")
                    .startTime(LocalDateTime.now().minusHours(i+2).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                    .endTime(LocalDateTime.now().minusHours(i).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                    .build());
        }

        doReturn(user)
                .when(userRepository)
                .findByEmail(user.getEmail());
        doReturn(null)
                .when(dailyRepository)
                .saveAll(any());

        // when
        int cnt = target.insertTodayData(req, "kosy1782@gmail.com");

        // then
        assertThat(cnt).isEqualTo(req.size());
    }

}
