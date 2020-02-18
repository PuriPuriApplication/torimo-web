#!/bin/sh

docker image prune -f

# build
docker build --tag torimo-web .

# run
docker run --rm -it --name torimo-web -p 8888:8888 -v ${PWD}:/app -v /app/node_modules torimo-web