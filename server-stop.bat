@echo off
set SCRIPT_DIR=%~dp0
cd %SCRIPT_DIR%
docker-compose -f %SCRIPT_DIR%/server/db2d/compose.yaml down