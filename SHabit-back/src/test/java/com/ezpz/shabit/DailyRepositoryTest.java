package com.ezpz.shabit;

import com.ezpz.shabit.statistics.entity.Daily;
import com.ezpz.shabit.statistics.entity.Posture;
import com.ezpz.shabit.statistics.repository.DailyRepository;
import com.ezpz.shabit.statistics.repository.PostureRepository;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest // JPA Repository들에 대한 빈들을 등록하여 단위 테스트의 작성을 용이하게 함
@DisplayName("DailyRepository 테스트")
public class DailyRepositoryTest {

    @Autowired
    private DailyRepository dailyRepository;
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

    @Test
    public void 데이터_일치하는_이메일_없음(){
        // given
        final Daily todayData = Daily.builder()
                .user(user)
                .posture(posture)
                .startTime(LocalDateTime.now().minusHours(2))
                .endTime(LocalDateTime.now())
                .build();
        postureRepository.save(posture);
        userRepository.save(user);
        dailyRepository.save(todayData);

        // when
        List<Daily> data = dailyRepository.findByUserEmailOrderByStartTimeAsc("kosy1782");

        //then
        assertThat(data.size()).isEqualTo(0);
    }

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

}
