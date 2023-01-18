package com.ezpz.shabit;

import com.ezpz.shabit.statistics.entity.Grass;
import com.ezpz.shabit.statistics.repository.GrassRepository;
import com.ezpz.shabit.statistics.service.StatisticsServiceImpl;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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
    private GrassRepository grassRepository;
    @Mock
    private UserRepository userRepository;

    private final String email = "kosy1782@gmail.com";

    final Users user = Users.builder()
            .email("kosy1782@gmail.com")
            .nickname("고수")
            .password("1234")
            .build();

    @Test
    public void 잔디_데이터_일치하는_이메일_없음(){
        // given
        doReturn(null).when(userRepository)
                .findByEmail("kosy1782");

        // when
        final NullPointerException exception = assertThrows(NullPointerException.class, () -> target.getGrassData("kosy1782"));

        // then
        assertThat(exception.getMessage()).isEqualTo("Cannot invoke \"com.ezpz.shabit.user.entity.Users.getEmail()\" because \"user\" is null");
    }

    @Test
    public void 잔디_데이터_가져오기_성공(){
        // given
        doReturn(Users.builder().email(email).build()).when(userRepository)
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

}
