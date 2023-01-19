package com.ezpz.shabit.statistics.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTotalTime is a Querydsl query type for TotalTime
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTotalTime extends EntityPathBase<TotalTime> {

    private static final long serialVersionUID = -1514222330L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTotalTime totalTime = new QTotalTime("totalTime");

    public final NumberPath<Integer> monthly = createNumber("monthly", Integer.class);

    public final NumberPath<Integer> today = createNumber("today", Integer.class);

    public final NumberPath<Long> totalTimeId = createNumber("totalTimeId", Long.class);

    public final com.ezpz.shabit.user.entity.QUsers user;

    public final NumberPath<Integer> weekly = createNumber("weekly", Integer.class);

    public QTotalTime(String variable) {
        this(TotalTime.class, forVariable(variable), INITS);
    }

    public QTotalTime(Path<? extends TotalTime> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTotalTime(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTotalTime(PathMetadata metadata, PathInits inits) {
        this(TotalTime.class, metadata, inits);
    }

    public QTotalTime(Class<? extends TotalTime> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.ezpz.shabit.user.entity.QUsers(forProperty("user")) : null;
    }

}

