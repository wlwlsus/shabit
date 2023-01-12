package com.ezpz.shabit.statistics.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGrass is a Querydsl query type for Grass
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGrass extends EntityPathBase<Grass> {

    private static final long serialVersionUID = -1929256693L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGrass grass = new QGrass("grass");

    public final DateTimePath<java.util.Date> date = createDateTime("date", java.util.Date.class);

    public final NumberPath<Long> grassId = createNumber("grassId", Long.class);

    public final NumberPath<Integer> percentage = createNumber("percentage", Integer.class);

    public final com.ezpz.shabit.user.entity.QUser user;

    public QGrass(String variable) {
        this(Grass.class, forVariable(variable), INITS);
    }

    public QGrass(Path<? extends Grass> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGrass(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGrass(PathMetadata metadata, PathInits inits) {
        this(Grass.class, metadata, inits);
    }

    public QGrass(Class<? extends Grass> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.ezpz.shabit.user.entity.QUser(forProperty("user"), inits.get("user")) : null;
    }

}

