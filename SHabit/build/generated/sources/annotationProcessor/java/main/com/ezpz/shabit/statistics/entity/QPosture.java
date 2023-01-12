package com.ezpz.shabit.statistics.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QPosture is a Querydsl query type for Posture
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPosture extends EntityPathBase<Posture> {

    private static final long serialVersionUID = 738559709L;

    public static final QPosture posture = new QPosture("posture");

    public final StringPath name = createString("name");

    public final NumberPath<Long> postureId = createNumber("postureId", Long.class);

    public QPosture(String variable) {
        super(Posture.class, forVariable(variable));
    }

    public QPosture(Path<? extends Posture> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPosture(PathMetadata metadata) {
        super(Posture.class, metadata);
    }

}

