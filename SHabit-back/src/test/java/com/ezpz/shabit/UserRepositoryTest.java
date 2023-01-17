package com.ezpz.shabit;

import com.ezpz.shabit.statistics.entity.Posture;
import com.ezpz.shabit.statistics.entity.Statistics;
import com.ezpz.shabit.statistics.repository.PostureRepository;
import com.ezpz.shabit.statistics.repository.StatisticsRepository;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.List;

import static java.time.LocalDate.now;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class UserRepositoryTest {

    @Autowired
    private StatisticsRepository statisticsRepository;
    @Autowired
    private PostureRepository postureRepository;
    @Autowired
    private UserRepository userRepository;

    final Posture posture = Posture.builder()
            .name("바른 자세")
            .build();
    final Users user = Users.builder()
            .email("kosy1782@gmail.com")
            .nickname("고수")
            .password("1234")
            .image(null)
            .build();
    final Statistics statistic = Statistics.builder()
            .user(user)
            .posture(posture)
            .time(30)
            .date(now())
            .build();

    @Test
    @DisplayName("주간 데이터 뽑기 테스트")
    public void getWeeklyData(){
        // given
        postureRepository.save(posture);
        userRepository.save(user);
        statisticsRepository.save(statistic);

        // yyyy-mm-dd 형식
        LocalDate today = now();
        LocalDate weekStart = today.minusDays(today.getDayOfWeek().getValue());

        // when
        List<Statistics> data = statisticsRepository.findByUserEmailAndDateBetweenOrderByDateAsc(user.getEmail(), weekStart, today);

        //then
        System.out.println(data.toString());
        assertThat(data.size()).isEqualTo(1);
        assertThat(data.get(0).getDate()).isEqualTo(now());
        assertThat(data.get(0).getTime()).isEqualTo(30);
    }
}
