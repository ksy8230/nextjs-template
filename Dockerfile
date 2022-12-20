# 기본 이미지
FROM node:16.13.2-alpine

# 작업 폴더 지정
WORKDIR /app/frontend/

# 종속성 설치를 위한 파일 복사
COPY package*.json /app/frontend/

# 종속성 설치
RUN npm install

# 필요한 파일 복사
COPY . /app/frontend/

# # 파일 빌드
# RUN npm run build

# node 실행
CMD [ "npm", "start" ]