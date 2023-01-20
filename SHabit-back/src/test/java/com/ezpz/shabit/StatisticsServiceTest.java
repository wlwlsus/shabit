package com.ezpz.shabit;

import com.ezpz.shabit.statistics.entity.Posture;
import com.ezpz.shabit.statistics.entity.Statistics;
import com.ezpz.shabit.statistics.repository.DailyRepository;
import com.ezpz.shabit.statistics.repository.StatisticsRepository;
import com.ezpz.shabit.statistics.entity.Grass;
import com.ezpz.shabit.statistics.repository.GrassRepository;
import com.ezpz.shabit.statistics.dto.req.DailyReqDto;
import com.ezpz.shabit.statistics.repository.PostureRepository;
import com.ezpz.shabit.statistics.service.StatisticsServiceImpl;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.time.LocalDate.now;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import java.time.format.DateTimeFormatter;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
public class StatisticsServiceTest {

    @InjectMocks
    private StatisticsServiceImpl target;
    @Mock
    private GrassRepository grassRepository;
    @Mock
    private StatisticsRepository statisticsRepository;
    @Mock
    private DailyRepository dailyRepository;
    @Mock
    private PostureRepository postureRepository;
    @Mock
    private UserRepository userRepository;

    private final String email = "kosy1782@gmail.com";
    private final LocalDate today = LocalDate.now();


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
    public void 잔디_데이터_일치하는_이메일_없음(){
        // given
        doReturn(null).when(userRepository)
                .findByEmail("kosy1782");

        // when
        final NullPointerException exception = assertThrows(NullPointerException.class, () -> target.getGrassData("kosy1782"));

        // then
        assertThat(exception.getMessage()).isEqualTo("Cannot invoke \"java.util.Optional.orElse(Object)\" because the return value of \"com.ezpz.shabit.user.repository.UserRepository.findByEmail(String)\" is null");
    }

    @Test
    public void 잔디_데이터_가져오기_성공(){
        // given
        doReturn(Optional.of(Users.builder().email(email).build())).when(userRepository)
                .findByEmail(email);
        doReturn(grassList()).when(grassRepository)
                .findByUserEmailOrderByDateAsc(email);

        // when
        final List<Grass> data = target.getGrassData(email);

        // then
        System.out.println(data);
        assertThat(data.size()).isEqualTo(30);
        assertThat(data.get(0).getDate()).isEqualTo(now().minusDays(29));
    }

    private List<Grass> grassList() {
        List<Grass> grassList = new ArrayList<>();
        for(int i=29; i>=0; i--){
            grassList.add(Grass.builder()
                    .user(user)
                    .date(now().minusDays(i))
                    .percentage(i*10)
                    .build());
        }
        return grassList;
    }

    @Test
    public void 주간_데이터_일치하는_이메일_없음(){
        int page = -1;

        LocalDate weekStart = today.minusDays(today.getDayOfWeek().getValue()).minusWeeks(page*(-1));
        LocalDate weekEnd = today.minusDays((today.getDayOfWeek().getValue()-6)).minusWeeks(page*(-1));

        System.out.println(weekStart);
        System.out.println(weekEnd);

        // given
        doReturn(Optional.empty()).when(userRepository)
                .findByEmail("kosy1782");

        // when
        final NullPointerException exception = assertThrows(NullPointerException.class, () -> target.getWeeklyData("kosy1782", page));

        // then
        assertThat(exception.getMessage()).isEqualTo("일치하는 유저가 존재하지 않습니다.");
    }

    @Test
    public void 주간_데이터_가져오기_성공(){
        int page = -1;

        LocalDate weekStart = today.minusDays(today.getDayOfWeek().getValue()).minusWeeks(page*(-1));
        LocalDate weekEnd = today.minusDays((today.getDayOfWeek().getValue()-6)).minusWeeks(page*(-1));

        // given
        doReturn(Optional.of(Users.builder().email(email).build())).when(userRepository)
                .findByEmail(email);
        doReturn(statisticsList1()).when(statisticsRepository)
                .findByUserEmailAndDateBetweenOrderByDateAsc(email, weekStart, weekEnd);

        // when
        final List<Statistics> data = target.getWeeklyData(email, page);

        // then
        assertThat(data.size()).isEqualTo(3);
    }

    private List<Statistics> statisticsList1() {
        List<Statistics> statisticsList = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            statisticsList.add(Statistics.builder().posture(posture).user(user).date(now().minusDays(i)).time(i*10).build());
        }
        return statisticsList;
    }
    @Test
    public void 트래킹_데이터_입력_일치하는_이메일_없음(){
        // given
        List<DailyReqDto> req = new ArrayList<>();
        for(int i=0; i<5; i++){
            req.add(DailyReqDto.builder()
                    .postureId(1L)
                    .startTime(LocalDateTime.now().minusHours(i+2).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                    .endTime(LocalDateTime.now().minusHours(i).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                    .build());
        }

        doReturn(Optional.empty()).when(userRepository)
                .findByEmail("kosy1782");

        // when
        final NullPointerException exception = assertThrows(NullPointerException.class, () -> target.insertTodayData(req, "kosy1782"));

        // then
        assertThat(exception.getMessage()).isEqualTo("일치하는 유저가 존재하지 않습니다.");
    }


    @Test
    public void 트래킹데이터_저장_성공(){
        // given
        List<DailyReqDto> req = new ArrayList<>();
        for(int i=0; i<5; i++){
            req.add(DailyReqDto.builder()
                    .postureId(Integer.toUnsignedLong(i+1))
                    .startTime(LocalDateTime.now().minusHours(i+2).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                    .endTime(LocalDateTime.now().minusHours(i).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                    .build());
        }

        doReturn(Optional.of(user))
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
        assertThat(exception.getMessage()).isEqualTo("Cannot invoke \"java.util.Optional.orElse(Object)\" because the return value of \"com.ezpz.shabit.user.repository.UserRepository.findByEmail(String)\" is null");
    }

    @Test
    public void 월간_데이터_가져오기_성공(){
        int page = -1;

        LocalDate monthStart = today.minusDays(today.getDayOfMonth()-1); // 오늘 기준 month start
        monthStart = monthStart.minusMonths((-1)*page);

        LocalDate monthEnd = monthStart.withDayOfMonth(monthStart.lengthOfMonth());


        // given
        doReturn(Optional.of(Users.builder().email(email).build())).when(userRepository)
                .findByEmail(email);
        doReturn(statisticsList2()).when(statisticsRepository)
                .findByUserEmailAndDateBetweenOrderByDateAsc(email, monthStart, monthEnd);

        // when
        final List<Statistics> data = target.getMonthlyData(email, page);

        // then
        assertThat(data.size()).isEqualTo(30-now().getDayOfMonth());
    }

    private List<Statistics> statisticsList2() {
        List<Statistics> statisticsList = new ArrayList<>();
        for (int i = 0; i < 30; i++) {
            if(now().minusDays(i).getMonthValue() != 12) continue;
            statisticsList.add(Statistics.builder().posture(posture).user(user).date(now().minusDays(i)).time(i*10).build());
        }
        return statisticsList;
    }

}
