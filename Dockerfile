FROM docker pull node:20.11

# 애플리케이션 코드를 컨테이너 내부에 복사할 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 파일을 먼저 복사
COPY package*.json ./

# 필요한 npm 패키지 설치
RUN npm install

# 나머지 소스 코드 복사
COPY . .

# React 애플리케이션 빌드
RUN npm run build

# serve 패키지를 글로벌로 설치하여 런타임에 사용
RUN npm install -g serve

# 노출시킬 포트 설정
EXPOSE 3000

# serve를 이용해 build 디렉토리의 정적 파일을 serve하기
CMD ["serve", "-s", "build", "-l", "3000"]
