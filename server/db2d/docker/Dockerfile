FROM maven:3.9-eclipse-temurin-21-alpine as builder
ENV HOME=/usr/app
RUN mkdir -p $HOME
WORKDIR $HOME
ADD . $HOME
RUN --mount=type=cache,target=/root/.m2 mvn -f $HOME/pom.xml clean package -DskipTests

FROM eclipse-temurin:21-alpine
COPY --from=builder /usr/app/target/*.jar /app/runner.jar
EXPOSE 8181
ENTRYPOINT java -jar /app/runner.jar