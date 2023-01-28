FROM openjdk:17-jdk-slim as builder

COPY SHabit-back/gradlew .
COPY SHabit-back/gradle gradle
COPY SHabit-back/build.gradle .
COPY SHabit-back/settings.gradle .
COPY SHabit-back/src src
RUN chmod +x SHabit-back/./gradlew
RUN SHabit-back/./gradlew bootJar

FROM openjdk:17-jdk-slim
COPY --from=builder build/libs/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "/app.jar"]