package com.ezpz.shabit;

import com.ezpz.shabit.statistics.entity.Daily;
import com.ezpz.shabit.statistics.entity.Posture;
import com.ezpz.shabit.statistics.repository.DailyRepository;
import com.ezpz.shabit.statistics.repository.PostureRepository;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class StatisticsRepositoryTest {

    @Autowired
    private DailyRepository dailyRepository;
    @Autowired
    private PostureRepository postureRepository;
    @Autowired
    private UserRepository userRepository;

    final Posture posture = Posture.builder()
            .name("바른 자세").build();

    final Users user = Users.builder()
            .email("kosy1782@gmail.com")
            .nickname("고수")
            .password("1234")
            .image(null)
            .build();

    @Test
    void 트래킹데이터_저장_성공() {
        // given
        userRepository.save(user);
        postureRepository.save(posture);
        Daily today = Daily.builder()
                .startTime(LocalDateTime.parse("2023-01-18 00:12",
                                DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .endTime(LocalDateTime.parse("2023-01-18 02:12",
                        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .posture(posture)
                .user(user)
                .build();

        // when
        Daily savedToday = dailyRepository.save(today);

        //then
        assertThat(savedToday.getStartTime()).isEqualTo(LocalDateTime.parse("2023-01-18 00:12",
                DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
        assertThat(savedToday.getEndTime()).isEqualTo(LocalDateTime.parse("2023-01-18 02:12",
                DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
    }

}