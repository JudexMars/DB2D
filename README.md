# DB2D
DB2D - Database for a development department
## Backend
### Запуск Postgres
Запуск:\
`docker-compose -f server/db2d/compose-db.yaml up`\
Остановка:\
`docker-compose -f server/db2d/compose-db.yaml down`
### Запуск только сервера
Запуск:\
`./server/db2d/mvnw -f server/db2d/ spring-boot:run`
### Запуск сервера + Postgres (docker)
Запуск:\
`docker-compose -f server/db2d/compose.yaml up --build -d`\
Остановка:\
`docker-compose -f server/db2d/compose.yaml down`

