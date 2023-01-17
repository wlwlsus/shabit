package com.ezpz.shabit.statistics.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStatistics is a Querydsl query type for Statistics
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStatistics extends EntityPathBase<Statistics> {

    private static final long serialVersionUID = 925032174L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStatistics statistics = new QStatistics("statistics");

    public final DatePath<java.time.LocalDate> date = createDate("date", java.time.LocalDate.class);

    public final QPosture posture;

    public final NumberPath<Long> statisticsId = createNumber("statisticsId", Long.class);

    public final NumberPath<Integer> time = createNumber("time", Integer.class);

    public final com.ezpz.shabit.user.entity.QUser user;

    public QStatistics(String variable) {
        this(Statistics.class, forVariable(variable), INITS);
    }

    public QStatistics(Path<? extends Statistics> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStatistics(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStatistics(PathMetadata metadata, PathInits inits) {
        this(Statistics.class, metadata, inits);
    }

    public QStatistics(Class<? extends Statistics> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.posture = inits.isInitialized("posture") ? new QPosture(forProperty("posture")) : null;
        this.user = inits.isInitialized("user") ? new com.ezpz.shabit.user.entity.QUser(forProperty("user"), inits.get("user")) : null;
    }

}

