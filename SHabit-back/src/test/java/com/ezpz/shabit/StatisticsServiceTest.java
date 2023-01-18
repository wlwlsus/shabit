package com.ezpz.shabit;

import com.ezpz.shabit.statistics.entity.Posture;
import com.ezpz.shabit.statistics.entity.Statistics;
import com.ezpz.shabit.statistics.repository.StatisticsRepository;
import com.ezpz.shabit.statistics.service.StatisticsServiceImpl;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static java.time.LocalDate.now;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
public class StatisticsServiceTest {

    @InjectMocks
    private StatisticsServiceImpl target;
    @Mock
    private StatisticsRepository statisticsRepository;
    @Mock
    private UserRepository userRepository;

    private final String email = "kosy1782@gmail.com";
    private final LocalDate today = LocalDate.now();
    private final LocalDate weekStart = today.minusDays(today.getDayOfWeek().getValue());

    final Posture posture = Posture.builder()
            .name("바른 자세")
            .build();
    final Users user = Users.builder()
            .email("kosy1782@gmail.com")
            .nickname("고수")
            .password("1234")
            .build();
    final Statistics statistic = Statistics.builder()
            .user(user)
            .posture(posture)
            .time(30)
            .date(now())
            .build();

    @Test
    public void 월간_데이터_일치하는_이메일_없음(){
        int page = -1;

        LocalDate monthStart = today.minusDays(today.getDayOfMonth()-1); // 오늘 기준 month start
        monthStart = monthStart.minusMonths((-1)*page);

        LocalDate monthEnd = monthStart.withDayOfMonth(monthStart.lengthOfMonth());

        // given
        doReturn(null).when(userRepository)
                .findByEmail("kosy1782");

        // when
        final NullPointerException exception = assertThrows(NullPointerException.class, () -> target.getMonthlyData("kosy1782", page));

        // then
        assertThat(exception.getMessage()).isEqualTo("Cannot invoke \"com.ezpz.shabit.user.entity.Users.getEmail()\" because \"user\" is null");
    }

    @Test
    public void 월간_데이터_가져오기_성공(){
        int page = -1;

        LocalDate monthStart = today.minusDays(today.getDayOfMonth()-1); // 오늘 기준 month start
        monthStart = monthStart.minusMonths((-1)*page);

        LocalDate monthEnd = monthStart.withDayOfMonth(monthStart.lengthOfMonth());


        // given
        doReturn(Users.builder().email(email).build()).when(userRepository)
                .findByEmail(email);
        doReturn(statisticsList()).when(statisticsRepository)
                .findByUserEmailAndDateBetweenOrderByDateAsc(email, monthStart, monthEnd);

        // when
        final List<Statistics> data = target.getMonthlyData(email, page);

        // then
        assertThat(data.size()).isEqualTo(30-now().getDayOfMonth());
    }

    private List<Statistics> statisticsList() {
        List<Statistics> statisticsList = new ArrayList<>();
        for (int i = 0; i < 30; i++) {
            if(now().minusDays(i).getMonthValue() != 12) continue;
            statisticsList.add(Statistics.builder().posture(posture).user(user).date(now().minusDays(i)).time(i*10).build());
        }
        return statisticsList;
    }

}
