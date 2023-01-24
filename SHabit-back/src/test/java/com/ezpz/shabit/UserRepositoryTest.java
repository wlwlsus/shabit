package com.ezpz.shabit;

import com.ezpz.shabit.statistics.entity.Daily;
import com.ezpz.shabit.statistics.entity.Posture;
import com.ezpz.shabit.statistics.entity.Statistics;
import com.ezpz.shabit.statistics.repository.DailyRepository;
import com.ezpz.shabit.statistics.repository.PostureRepository;
import com.ezpz.shabit.statistics.repository.StatisticsRepository;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static java.time.LocalDate.now;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest // JPA Repository들에 대한 빈들을 등록하여 단위 테스트의 작성을 용이하게 함
@DisplayName("UserRepository 테스트")
public class UserRepositoryTest {

    @Autowired
    private DailyRepository dailyRepository;
    @Autowired
    private PostureRepository postureRepository;

    @Autowired
    private StatisticsRepository statisticsRepository;
    @Autowired
    private UserRepository userRepository;

    final Posture posture = Posture.builder()
            .name("바른 자세")
            .build();
    final Users user = Users.builder()
            .email("kosy1782@gmail.com")
            .nickname("고수")
            .password("1234")
            .build();

    @Test
    public void findByEmail_성공(){
        // given
        postureRepository.save(posture);
        userRepository.save(user);

        for(int i=0; i<5; i++){
            final Daily todayData = Daily.builder()
                    .user(user)
                    .posture(posture)
                    .startTime(LocalDateTime.now().minusHours(i+2))
                    .endTime(LocalDateTime.now().minusHours(i))
                    .build();
            dailyRepository.save(todayData);
        }

        // when
        List<Daily> data = dailyRepository.findByUserEmailOrderByStartTimeAsc(user.getEmail());

        //then
        System.out.println(data.toString());
        assertThat(data.size()).isEqualTo(5);
    }

    @Test
    public void 데이터_일치하는_이메일_없음(){
        // given
        final Statistics statistic = Statistics.builder()
                .user(user)
                .posture(posture)
                .time(30)
                .date(now())
                .build();
        postureRepository.save(posture);
        userRepository.save(user);
        statisticsRepository.save(statistic);

        // yyyy-mm-dd 형식
        LocalDate today = now();
        LocalDate weekStart = today.minusDays(today.getDayOfWeek().getValue());

        // when
        List<Statistics> data = statisticsRepository.findByUserEmailAndDateBetweenOrderByDateAsc("kosy1782", weekStart, today);

        //then
        assertThat(data.size()).isEqualTo(0);
    }

    @Test
    public void findByUserEmailAndDateBetweenOrderByAsc_성공(){
        // given
        postureRepository.save(posture);
        userRepository.save(user);

        for(int i=0; i<30; i++){
            Statistics statistic = Statistics.builder()
                    .user(user)
                    .posture(posture)
                    .time(30)
                    .date(now().minusDays(i))
                    .build();
            statisticsRepository.save(statistic);
        }

        // yyyy-mm-dd 형식
        LocalDate today = now();
        LocalDate weekStart = today.minusDays(today.getDayOfWeek().getValue());
        LocalDate monthStart = today.minusDays(today.getDayOfMonth()-1);

        // when
        List<Statistics> data = statisticsRepository.findByUserEmailAndDateBetweenOrderByDateAsc(user.getEmail(), weekStart, today);
        List<Statistics> data2 = statisticsRepository.findByUserEmailAndDateBetweenOrderByDateAsc(user.getEmail(), monthStart, today);

        //then
        System.out.println(data.toString());
        assertThat(data.size()).isEqualTo(today.getDayOfWeek().getValue()+1);
        assertThat(data.get(0).getDate()).isEqualTo(weekStart);

        assertThat(data2.size()).isEqualTo(today.getDayOfMonth());
        assertThat(data2.get(0).getDate()).isEqualTo(monthStart);
    }

}
