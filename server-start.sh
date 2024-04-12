#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd $SCRIPT_DIR
docker-compose -f $SCRIPT_DIR/server/db2d/compose.yaml up --build -d