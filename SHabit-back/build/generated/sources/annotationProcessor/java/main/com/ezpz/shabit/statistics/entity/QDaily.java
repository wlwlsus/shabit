package com.ezpz.shabit.statistics.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDaily is a Querydsl query type for Daily
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDaily extends EntityPathBase<Daily> {

    private static final long serialVersionUID = -1932526226L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDaily daily = new QDaily("daily");

    public final NumberPath<Long> dailyId = createNumber("dailyId", Long.class);

    public final DateTimePath<java.time.LocalDateTime> endTime = createDateTime("endTime", java.time.LocalDateTime.class);

    public final QPosture posture;

    public final DateTimePath<java.time.LocalDateTime> startTime = createDateTime("startTime", java.time.LocalDateTime.class);

    public final com.ezpz.shabit.user.entity.QUsers user;

    public QDaily(String variable) {
        this(Daily.class, forVariable(variable), INITS);
    }

    public QDaily(Path<? extends Daily> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDaily(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDaily(PathMetadata metadata, PathInits inits) {
        this(Daily.class, metadata, inits);
    }

    public QDaily(Class<? extends Daily> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.posture = inits.isInitialized("posture") ? new QPosture(forProperty("posture")) : null;
        this.user = inits.isInitialized("user") ? new com.ezpz.shabit.user.entity.QUsers(forProperty("user")) : null;
    }

}

