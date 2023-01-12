package com.ezpz.shabit.admin.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QSetting is a Querydsl query type for Setting
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSetting extends EntityPathBase<Setting> {

    private static final long serialVersionUID = 1030754671L;

    public static final QSetting setting = new QSetting("setting");

    public final NumberPath<Integer> alertTime = createNumber("alertTime", Integer.class);

    public final NumberPath<Long> settingId = createNumber("settingId", Long.class);

    public final NumberPath<Integer> stretchingTime = createNumber("stretchingTime", Integer.class);

    public QSetting(String variable) {
        super(Setting.class, forVariable(variable));
    }

    public QSetting(Path<? extends Setting> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSetting(PathMetadata metadata) {
        super(Setting.class, metadata);
    }

}

