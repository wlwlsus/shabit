package com.ezpz.shabit.config;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Builder;
import lombok.Getter;

@Getter
@Document("shabit_log")
public class LogApiDao {
    @Id
    private String id;
    private String log;
    private LocalDateTime time;
    private LocalDateTime expire;

    @Builder
    public LogApiDao(String id, String log,  LocalDateTime time, LocalDateTime expire) {
        this.id = id;
        this.log = log;
        this.time = time;
        this.expire = expire;
    }

}