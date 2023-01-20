package com.ezpz.shabit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SHabitApplication {

    public static void main(String[] args) {
        SpringApplication.run(SHabitApplication.class, args);
    }

}
