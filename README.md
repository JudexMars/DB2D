# DataBase for Development Department
## Introduction
**DB2D** is a web
application that provides storage, management and exchange of information
between employees of private companies or other organizations within the framework of processes
related to the development of computer software.
- Centralized storage of information required by a large number of company employees;
- Data exchange and joint editing;
 Providing feedback on stored information expressed through reactions and comments to documents;
- Quick access to information and notifications about its changes.

## TOC 
- [**Guidelines**](#guidelines)
- [**Setup Local Environment**](#setup-loocal-environment)
- [**Guidelines**](#guidelines)
- [**Getting Start**](#getting-started)
- [**Guidelines**](#guidelines)

## Guidlines

## Setup Local Environment

## Getting Started

### Backend
#### Запуск Postgres
Запуск:\
`docker-compose -f server/db2d/compose-db.yaml up`\
Остановка:\
docker-compose -f server/db2d/compose-db.yaml down
### Запуск только сервера
Запуск:\
./server/db2d/mvnw -f server/db2d/ spring-boot:run
### Запуск сервера + Postgres (docker)
Запуск:\
`docker-compose -f server/db2d/compose.yaml up --build -d`\
Остановка:\
docker-compose -f server/db2d/compose.yaml down

## Getting Started
