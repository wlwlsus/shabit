package com.ezpz.shabit.statistics.repository;

import com.ezpz.shabit.statistics.entity.Statistics;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static com.ezpz.shabit.statistics.entity.QStatistics.statistics;

@Repository
@RequiredArgsConstructor
public class StatisticsRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public List<Statistics> findByEmailAndDateBetween(String email, LocalDate startDate, LocalDate endDate){
        return queryFactory
                .selectFrom(statistics)
                .where(statistics.user.email.eq(email)
                        .and(statistics.date.between(startDate, endDate))
                )
                .fetch();
    }

}
