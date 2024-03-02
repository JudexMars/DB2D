# Backend

## Postgres startup

Запуск:\
`docker-compose -f server/db2d/compose-db.yaml up`\
Остановка:\
docker-compose -f server/db2d/compose-db.yaml down

## Running server only

Запуск:\
./server/db2d/mvnw -f server/db2d/ spring-boot:run

## Запуск сервера + Postgres (docker)

Запуск:\
`docker-compose -f server/db2d/compose.yaml up --build -d`\
Остановка:\
docker-compose -f server/db2d/compose.yaml down
