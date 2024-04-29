#!/bin/bash

# Docker 컨테이너 시작 시 실행될 스크립트입니다.
# 보안상의 이유로 아래 커맨드를 컨테이너의 시작 시마다 실행합니다.
npm run build # .env 파일을 실어서 다시 빌드함
#npm install -g serve
npx serve -s build -l 3000

echo "완료"

