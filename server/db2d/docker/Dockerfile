FROM maven:3.8.4-openjdk-17 as builder
ENV HOME=/usr/app
RUN mkdir -p $HOME
WORKDIR $HOME
ADD . $HOME
RUN --mount=type=cache,target=/root/.m2 mvn -f $HOME/pom.xml clean package -DskipTests

FROM eclipse-temurin:17
COPY --from=builder /usr/app/target/*.jar /app/runner.jar
EXPOSE 8181
ENTRYPOINT java -jar /app/runner.jar