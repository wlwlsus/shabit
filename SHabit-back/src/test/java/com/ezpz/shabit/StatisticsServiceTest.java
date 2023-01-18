package com.ezpz.shabit;

import com.ezpz.shabit.statistics.entity.Daily;
import com.ezpz.shabit.statistics.entity.Posture;
import com.ezpz.shabit.statistics.repository.DailyRepository;
import com.ezpz.shabit.statistics.service.StatisticsServiceImpl;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
public class StatisticsServiceTest {

    @InjectMocks
    private StatisticsServiceImpl target;
    @Mock
    private DailyRepository dailyRepository;
    @Mock
    private UserRepository userRepository;

    private final String email = "kosy1782@gmail.com";

    final Posture posture = Posture.builder()
            .name("바른 자세")
            .build();
    final Users user = Users.builder()
            .email("kosy1782@gmail.com")
            .nickname("고수")
            .password("1234")
            .build();

    @Test
    public void 오늘_데이터_일치하는_이메일_없음(){
        // given
        doReturn(null).when(userRepository)
                .findByEmail("kosy1782");

        // when
        final NullPointerException exception = assertThrows(NullPointerException.class, () -> target.getTodayData("kosy1782"));

        // then
        assertThat(exception.getMessage()).isEqualTo("Cannot invoke \"com.ezpz.shabit.user.entity.Users.getEmail()\" because \"user\" is null");
    }

    @Test
    public void 오늘_데이터_가져오기_성공(){
        // given
        doReturn(Users.builder().email(email).build()).when(userRepository)
                .findByEmail(email);
        doReturn(dailyList()).when(dailyRepository)
                .findByUserEmailOrderByStartTimeAsc(email);

        // when
        final List<Daily> data = target.getTodayData(email);

        // then
        assertThat(data.size()).isEqualTo(5);
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
