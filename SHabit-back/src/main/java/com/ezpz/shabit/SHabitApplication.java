package com.ezpz.shabit;

import com.ezpz.shabit.config.auth.base.oauth.handler.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
@EnableConfigurationProperties({
        AppProperties.class
})
public class SHabitApplication {

    public static void main(String[] args) {
        SpringApplication.run(SHabitApplication.class, args);
    }

}
