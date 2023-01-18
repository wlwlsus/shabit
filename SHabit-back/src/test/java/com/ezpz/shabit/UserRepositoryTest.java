package com.ezpz.shabit;

import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest // JPA Repository들에 대한 빈들을 등록하여 단위 테스트의 작성을 용이하게 함
@DisplayName("UserRepository 테스트")
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    final Users user = Users.builder()
            .email("kosy1782@gmail.com")
            .nickname("고수")
            .password("1234")
            .image(null)
            .build();

    @Test
    @DisplayName("주간 데이터 뽑기 테스트")
    public void getWeeklyData(){
        // given
        userRepository.save(user);

        // when
        Users foundUser = userRepository.findByEmail(user.getEmail());

        //then
        assertThat(foundUser.getEmail()).isEqualTo(user.getEmail());
    }
}
