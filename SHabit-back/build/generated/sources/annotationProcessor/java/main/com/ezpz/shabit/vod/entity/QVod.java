package com.ezpz.shabit.vod.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QVod is a Querydsl query type for Vod
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QVod extends EntityPathBase<Vod> {

    private static final long serialVersionUID = -701055186L;

    public static final QVod vod = new QVod("vod");

    public final StringPath category = createString("category");

    public final StringPath name = createString("name");

    public final StringPath url = createString("url");

    public final NumberPath<Long> vodId = createNumber("vodId", Long.class);

    public QVod(String variable) {
        super(Vod.class, forVariable(variable));
    }

    public QVod(Path<? extends Vod> path) {
        super(path.getType(), path.getMetadata());
    }

    public QVod(PathMetadata metadata) {
        super(Vod.class, metadata);
    }

}

