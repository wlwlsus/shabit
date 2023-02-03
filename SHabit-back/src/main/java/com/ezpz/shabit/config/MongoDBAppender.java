package com.ezpz.shabit.config;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.TimeZone;

import com.ezpz.shabit.config.LogApiRepository;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.UnsynchronizedAppenderBase;

@Component
public class MongoDBAppender extends UnsynchronizedAppenderBase<ILoggingEvent> implements ApplicationContextAware {
    private static LogApiRepository logRepository;

    final static String FORMAT_MESSAGE = "[%s] %s %s.%s:%d - %s";

    // @formatter:off
    protected void append(ILoggingEvent e) {

        LocalDateTime time =  LocalDateTime.ofInstant(Instant.ofEpochMilli(e.getTimeStamp()), TimeZone.getDefault().toZoneId());

        LogApiDao logDao = LogApiDao.builder()
                .log(formatLog(e))
                .time(time.plusHours(9))
                .expire(LocalDateTime.now())
                .build();
        logRepository.save(logDao);
    }

    private String formatLog(ILoggingEvent event){
        StackTraceElement[] callerData = event.getCallerData();
        StackTraceElement stackTraceElement = callerData[0];
        String threadName = event.getThreadName();
        String level = event.getLevel().toString();
        String logger = event.getLoggerName();
        String msg = event.getFormattedMessage();
        // String className = stackTraceElement.getClassName();
        String method = stackTraceElement.getMethodName();
        int lineNumber = stackTraceElement.getLineNumber();

        return String.format(FORMAT_MESSAGE, threadName, level, logger, method, lineNumber, msg);
    }

    public void setApplicationContext(ApplicationContext applicationContext) {
        if (applicationContext.getAutowireCapableBeanFactory().getBean(LogApiRepository.class) != null) {
            logRepository = (LogApiRepository) applicationContext.getAutowireCapableBeanFactory().getBean(LogApiRepository.class);
        }
    }

}