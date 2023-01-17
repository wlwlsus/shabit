package com.ezpz.shabit;

import com.ezpz.shabit.statistics.entity.Grass;
import com.ezpz.shabit.statistics.repository.GrassRepository;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static java.time.LocalDate.now;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest // JPA Repository들에 대한 빈들을 등록하여 단위 테스트의 작성을 용이하게 함
@DisplayName("StatisticsRepository 테스트")
public class GrassRepositoryTest {

    @Autowired
    private GrassRepository grassRepository;
    @Autowired
    private UserRepository userRepository;

    final Users user = Users.builder()
            .email("kosy1782@gmail.com")
            .nickname("고수")
            .password("1234")
            .image(null)
            .build();

    @Test
    public void 데이터_일치하는_이메일_없음(){
        // given
        final Grass grass = Grass.builder()
                .user(user)
                .date(now())
                .percentage(50)
                .build();
        userRepository.save(user);
        grassRepository.save(grass);

        // when
        List<Grass> data = grassRepository.findByUserEmailOrderByDateAsc("kosy1782");

        //then
        assertThat(data.size()).isEqualTo(0);
    }

    @Test
    public void findByUserEmailOrderByAsc_성공(){
        // given
        userRepository.save(user);

        for(int i=0; i<30; i++){
            Grass grass = Grass.builder()
                    .user(user)
                    .date(now().minusDays(i))
                    .percentage(i*10)
                    .build();
            grassRepository.save(grass);
        }

        // when
        List<Grass> data = grassRepository.findByUserEmailOrderByDateAsc(user.getEmail());

        //then
        System.out.println(data.toString());
        assertThat(data.size()).isEqualTo(30);
        assertThat(data.get(0).getDate()).isEqualTo(now().minusDays(29));
    }

}
