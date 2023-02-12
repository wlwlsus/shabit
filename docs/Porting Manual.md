# Porting Manual

# 개발 환경

## 서버 인스턴스 사양

- CPU 정보:

![Untitled](Porting%20Manual/Untitled.png)

- RAM : 16GB
    
    ![Untitled](Porting%20Manual/Untitled%201.png)
    
- Disk : 300GB
    
    ![Untitled](Porting%20Manual/Untitled%202.png)
    

## Front-end

| Node  | https://nodejs.org/dist/v18.13.0/node-v18.13.0-x64.msi |
| --- | --- |
| React  | 18.2.0 |
| React-router-dom: | 6.2.1 |
| Styled-components | 5.3.3  |
| Axios | 0.25.0 |

## Back-end

| java | 17 |
| --- | --- |
| Springboot | 3.0.1 |
| jUnit | 5 |
| gradle | 7.6 |
| swagger | org.springdoc:springdoc-openapi-starter-webmvc-ui:2.0.0 |
| mariaDB | 10.11.1 RC |

## DB

- MariaDB : 10.10.2-MariaDB-1:10.10.2+maria~ubu2204
- Redis : 7.0.8

## IDE

- IntelliJ : 2022.3.1
- Visual Studio Code : 1.75.0

## Infra

- Web Server : Nginx
- Jenkins : 2.388
- Docker : 20.10.23
- Docker-compose : 2.15.1

# 시스템 아키텍처

![시스템 아키텍처.jpg](Porting%20Manual/archi.jpeg)

# 배포 과정

- EC2 인스턴스는 이미 가지고 있다고 가정하겠습니다.

## 1. SSAFY EC2(서버) 접속

### 1. WSL 사용하여 EC2에 SSH 연결

- SSH 접속
1. 최초 접속 시 권한 요구하면 ‘yes’ 입력

```bash
# sudo ssh -i [pem키 위치] [접속 계정]@[접속할 도메인]
$ sudo ssh -i I8A601T.pem ubuntu@i8a601.p.ssafy.io
```

1. EC2 편리하게 접속하는 법
    - EC2 정보가 담긴 config파일을 만들어 번거롭게 pem와 도메인 경로를 쓰지 않고 접속할 수 있다.
        - ssh 전용 폴더 생성
        
        ```jsx
        	mkdir ~/.ssh 
        cd ~/.ssh // ssh 폴더 생성 및 이동
        cp [로컬 pem 키 위치] ~/.ssh // pem 키 옮기기
        vi config  // config 파일 생성
        ```
        
        - config 내용 추가
        
        ```jsx
        Host ssafy
                HostName [서버 ip 주소]
                User ubuntu
                IdentityFile ~/.ssh/[pem키 파일 명].pem
        ```
        
        - ssafy 계정에 접속
        
        ```jsx
        ssh ssafy
        ```
        

### 2. **EC2 초기 설정**

```bash
$ sudo apt update
$ sudo apt upgrade
$ sudo apt install build-essential
```

### 3. 한국으로 시간 설정

```bash
$ sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

# 시간 확인
$ date
```

![Untitled](Porting%20Manual/Untitled%203.png)

## 2. EC2 환경 설정

### 1. Docker 설치

1. 기본 설정, 사전 설치

```bash
$ sudo apt update
$ sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

2. 자동 설치 스크립트 활용

- 리눅스 배포판 종류를 자동으로 인식하여 Docker 패키지를 설치해주는 스크립트를 제공

```bash
$ sudo wget -qO- https://get.docker.com/ | sh
```

3. Docker 서비스 실행하기 및 부팅 시 자동 실행 설정

```bash
$ sudo systemctl start docker
$ sudo systemctl enable docker
```

4. Docker 그룹에 현재 계정 추가

```bash
$ sudo usermod -aG docker ${USER}
$ sudo systemctl restart docker
```

- sudo를 사용하지 않고 docker를 사용할 수 있다.
- docker 그룹은 root 권한과 동일하므로 꼭 필요한 계정만 포함
- 현재 계정에서 로그아웃한 뒤 다시 로그인

5. Docker 설치 확인

```bash
$ docker -v
```

### 2. Docker Maria DB

1. Docker Maria DB 이미지 다운로드 받기

```bash
$ docker pull mariadb
```

1. Docker에 Maria DB 컨테이너 만들고 실행하기

```bash
$ docker run --name mariadb -d -p 3306:3306 -v /var/lib/mysql_main:/var/lib/mysql --restart=always -e MYSQL_ROOT_PASSWORD=root mariadb
```

- 옵션 설명
    - -v : 마운트 설정, hotst 의 /var/lib/mysql 과 mariadb의 /var/lib/mysql의 파일들을 동기화
    - -name: 만들어서 사용할 컨테이너의 이름을 정의
    - d: 컨테이너를 백그라운드에서 실행
    - p: 호스트와 컨테이너 간의 포트를 연결 (host-port:container-port) // 호스트에서 3306 포트 연결 시 컨테이너 3306 포트로 포워딩
    - -restart=always: 도커가 실행되는 경우 항상 컨테이너를 실행
    - e: 기타 환경설정(Enviorment)
    - MYSQL_ROOT_PASSWORD=root // mariadb의 root 사용자 초기 비밀번호를 설정
    - mariadb: 컨테이너를 만들 때 사용할 이미지 이름

1. Maria DB에 database를 추가하고 user 권한 설정
- Docker - Mariadb 컨테이너 접속하기

```
docker exec -it mariadb /bin/bash
```

- Mariadb - 루트 계정으로 데이터베이스 접속하기

```
mysql -u root -p
```

비밀번호는 "root"

**Mariadb 사용자 추가하기**

```
예시) create user 'user_name'@'XXX.XXX.XXX.XXX' identified by 'user_password';

create user 'ssafy601'@'%' identified by 'ssafy601';
```

**Mariadb - 사용자 권한 부여하기**

```
예시) grant all privileges on db_name.* to 'user_name'@'XXX.XXX.XXX.XXX';
flush privileges;

grant all privileges on *.* to 'ssafy601'@'%';
flush privileges;
```

**Mariadb - 데이터 베이스 만들기**

```
예시) create database [db_name];

create database ssafy601;
```

### 3. Docker Redis

- Redis 이미지 받기

```jsx
docker pull redis:alpine
```

- 도커 네트워크 생성 [디폴트값]

```jsx
docker network create redis-network
```

- 도커 네트워크 상세정보 확인

```jsx
docker inspect redis-network
```

- local-redis라는 이름으로 로컬-docker 간 6379 포트 개방

```jsx
docker run --name local-redis -p 6379:6379 --network redis-network -v /redis_temp:/data -d redis:alpine redis-server --appendonly yes
```

- Docker 컨테이너 확인

```jsx
docker ps -a
```

- 컨테이너 진입

```jsx
# 실행 중인 redis 컨테이너에 대해 docker redis-cli 로 직접 진입
docker run -it --network redis-network --rm redis:alpine redis-cli -h local-redis

# bash로도 진입 가능하다.
docker run -it --network redis-network --rm redis:alpine bash
redis-cli
```

- 권한 추가

```bash
# slaveof no one : 현재 슬레이브(복제)인 자신을 마스터로 만듭니다.
127.0.0.1:6379> slaveof no one
```

- 테스트
    - OK 가 뜨면 성공

![Untitled](Porting%20Manual/Untitled%204.png)

### 3. Dockerfile로 Jenkins images 받기 (Docker in Docker, DinD 방식)

- Dockerfile 작성

```bash
# 폴더 생성
mkdir config && cd config

# 아래 내용 작성
$ vi Dockerfile

FROM jenkins/jenkins:jdk17

#도커를 실행하기 위한 root 계정으로 전환
USER root

#도커 설치
COPY docker_install.sh /docker_install.sh
RUN chmod +x /docker_install.sh
RUN /docker_install.sh

#설치 후 도커그룹의 jenkins 계정 생성 후 해당 계정으로 변경
RUN groupadd -f docker
RUN usermod -aG docker jenkins
USER jenkins
```

- docker 설치 shell 파일

```bash
$ vi docker_install.sh

#!/bin/sh
apt-get update && \
apt-get -y install apt-transport-https \
  ca-certificates \
  curl \
  gnupg2 \
  zip \
  unzip \
  software-properties-common && \
curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg > /tmp/dkey; apt-key add /tmp/dkey && \
add-apt-repository \
"deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") \
$(lsb_release -cs) \
stable" && \
apt-get update && \
```

- Docker 이미지 생성

```bash
docker build -t jenkins/myjenkins .
```

- Jenkins 컨테이너 생성

```bash
docker run -d -p 9090:8080 --name=jenkinscicd \
-e TZ=Asia/Seoul
-v /var/jenkinsDir:/var/jenkins_home \
-v /var/run/docker.sock:/var/run/docker.sock \

jenkins/myjenkins
```

- 옵션 설명
    
    `-d` : 는 백그라운드에서 실행을 의미
    
    `-p` 는 매핑할 포트를 의미합니다. ( p가 port의 단축어가 아니었음 .. )
    
    `:` 기준으로 왼쪽은 로컬포트, 오른쪽은 도커 이미지의 포트를 의미합니다. 도커 이미지에서의 8080 포트를 로컬 포트 9090으로 매핑한다는 뜻입니다.
    
    ```
    -v /var/run/docker.sock:/var/run/docker.sock \
    jenkins/myjenkins
    ```
    
    이 옵션은 로컬의 도커와 젠킨스 내에서 사용할 도커 엔진을 동일한 것으로 사용하겠다는 의미입니다.
    
    `v` 옵션은 ":"를 기준으로 왼쪽의 로컬 경로를 오른쪽의 컨테이너 경로로 마운트 해줍니다.
    
    즉, 제 컴퓨터의 **`사용자경로/jenkinsDir`** 을 컨테이너의 **`/var/jenkins_home`**과 바인드 시켜준다는 것입니다. 물론, 양방향으로 연결됩니다.
    
    컨테이너가 종료되거나 알 수없는 오류로 정지되어도, jenkins_home에 남아있는 소중한 설정 파일들은 로컬 경로에 남아있게 됩니다.
    

## 3. Jenkins 초기 세팅 및 테스트

- 젠킨스에 접속하기 전에 `/var/run/docker.sock` 에 대한 권한을 설정해주어야 합니다.
- 초기 `/var/run/docker.sock`의 권한이 **소유자와 그룹 모두 root**였기 때문에 이제 그룹을 root에서 `docker`로 변경해줄겁니다.
- 먼저, jenkins로 실행됐던 컨테이너의 bash를 root 계정으로 로그인 하기전에, 현재 실행되고 있는 컨테이너의 정보들을 확인할 수 있는 명령어를 입력해 아이디를 확인하겠습니다.

```
docker ps -a
```

![https://images.velog.io/images/hind_sight/post/7897203d-6b06-458c-a7ff-db706d2c38e9/image.png](https://images.velog.io/images/hind_sight/post/7897203d-6b06-458c-a7ff-db706d2c38e9/image.png)

- 우리가 방금 생성한 컨테이너의 ID는 **0bcdb8~** 입니다. 도커는 다른 컨테이너 ID와 겹치지 않는 부분까지 입력하면 해당 컨테이너로 알아서 매핑해줍니다.

```
docker exec -it -u root 컨테이너ID /bin/bash
```

`exec`는 컨테이너에 명령어를 실행시키는 명령어인데, /bin/bash와 옵션 -it를 줌으로써 컨테이너의 쉘에 접속할 수 있습니다.

이제 정말로 root 계정으로 컨테이너에 접속하기 위해 컨테이너ID에 0bc를 입력해 실행합니다.

![https://images.velog.io/images/hind_sight/post/dc9722a9-1959-47ac-947e-167f134686a2/image.png](https://images.velog.io/images/hind_sight/post/dc9722a9-1959-47ac-947e-167f134686a2/image.png)

- root 계정으로 로그인이 잘 되었습니다. 이제 그룹을 바꾸기 위해 다음 명령어를 실행해줍니다.

```
chown root:docker /var/run/docker.sock
```

- 그리고 이제 쉘을 exit 명령어로 빠져나온 후 다음 명령어를 실행해 컨테이너를 재실행해줍니다.

```
docker restart [컨테이너 ID]
```

- Jenkins 패스워드 확인

```
docker logs bd2
```

- docker logs 컨테이너 id를 입력해 로그를 출력하면 initialAdminPassword가 출력됩니다. 이 패스워드를 입력해주면 됩니다.

![https://images.velog.io/images/hind_sight/post/92531a06-5df6-4983-82ae-aa5be65f560c/image.png](https://images.velog.io/images/hind_sight/post/92531a06-5df6-4983-82ae-aa5be65f560c/image.png)

![https://images.velog.io/images/hind_sight/post/56e653e2-20b7-4c6a-a50e-dd998d61dd37/image.png](https://images.velog.io/images/hind_sight/post/56e653e2-20b7-4c6a-a50e-dd998d61dd37/image.png)

- 정상적으로 입력했다면 플러그인 설치가 나오는데, 우리는 Install suggested plugins를 선택합니다.

![https://images.velog.io/images/hind_sight/post/058f2ff5-86ab-4b79-b2d2-6ce9819ce3ba/image.png](https://images.velog.io/images/hind_sight/post/058f2ff5-86ab-4b79-b2d2-6ce9819ce3ba/image.png)

- 설치가 완료되면, 어드민 계정 생성창이 나오고, 본인이 사용하실 정보들을 입력해줍시다.

![create.png](Porting%20Manual/create.png)

![https://images.velog.io/images/hind_sight/post/c43f4bfb-1dd4-458c-84d7-a507fc4b5bd8/image.png](https://images.velog.io/images/hind_sight/post/c43f4bfb-1dd4-458c-84d7-a507fc4b5bd8/image.png)

- 앞으로 이 url로 젠킨스에 접속하시면 됩니다.

- Jenkins 플러그인 설정
    - Gitlab, Docker 플러그인을 받습니다.

![Untitled](Porting%20Manual/Untitled%205.png)

![https://images.velog.io/images/hind_sight/post/bf13c3c3-5e3d-402c-859b-98405bae8ab0/image.png](https://images.velog.io/images/hind_sight/post/bf13c3c3-5e3d-402c-859b-98405bae8ab0/image.png)

- 여기까지 오셨다면, 젠킨스 설치 및 초기 세팅 완료!

### 6. CI/CD (빌드 및 배포) 세팅

![https://images.velog.io/images/hind_sight/post/3d7c26ca-0732-44f1-8009-e0849f4d5cb9/image.png](https://images.velog.io/images/hind_sight/post/3d7c26ca-0732-44f1-8009-e0849f4d5cb9/image.png)

먼저, 대쉬보드의 새로운 아이템을 클릭합니다.

![https://images.velog.io/images/hind_sight/post/864c5097-2966-4ffb-890d-7503177fb3ba/image.png](https://images.velog.io/images/hind_sight/post/864c5097-2966-4ffb-890d-7503177fb3ba/image.png)

아이템이름을 자유롭게 입력해주시고, Freestyle project를 선택하고, OK로 생성합니다.

이제 빌드 설정창이 뜰텐데, 소스 코드 관리쪽에서 Git을 선택하고, Repository URL에 다음과 같이 입력해줍니다.

Gitlab 저장소를 입력하시면 됩니다.

![https://images.velog.io/images/hind_sight/post/df2ebf50-975c-4863-b687-ec0093993599/image.png](https://images.velog.io/images/hind_sight/post/df2ebf50-975c-4863-b687-ec0093993599/image.png)

이제 Build에서 Execute shell을 선택해줍니다.

![https://images.velog.io/images/hind_sight/post/1ad941c4-e597-417e-95f2-bd680021bd8c/image.png](https://images.velog.io/images/hind_sight/post/1ad941c4-e597-417e-95f2-bd680021bd8c/image.png)

- 폴더 내에 prod와 dev 두가지 버전이 존재하며 prod 환경 기준으로 설명하겠습니다.
- Gitlab의 저장소와 연동되어 폴더 내의 start-prod.sh 파일이 실행 됩니다.

```
bash start-prod.sh
```

### 빌드 확인

이제 드디어 세팅한 값들을 확인해볼 차례입니다. 위의 내용들을 저장하고 Build Now를 눌러봅니다.

### Webhook 설정

- Jenkins 트리거 체크
    
    ![Untitled](Porting%20Manual/Untitled%206.png)
    
- Gitlab에서 Webhook과 jenkins URL 및 계정 연동
- Gitlab Webhook에서 생성한 token 값 Jenkins고급 설정에 추가

# 배포 환경 구성

## 도메인 구매

- 가비아 접속

[웹을 넘어 클라우드로. 가비아](https://www.gabia.com/)

- 도메인 선택
    
    ‼아래는 예시이고 실제 구매한 도메인은 “[shabit.site](http://shabit.site)” 입니다.
    

![Untitled](Porting%20Manual/Untitled%207.png)

- 도메인 결제

![Untitled](Porting%20Manual/Untitled%208.png)

- DNS 설정
    - My 가비아 → DNS 관리툴 → DNS 관리에서 호스트 / 값 설정

![Untitled](Porting%20Manual/Untitled%209.png)

## SSL 발급 받기

- [https://www.sslforfree.com/](https://www.sslforfree.com/) 접속
- 도메인 입력

![Untitled](Porting%20Manual/Untitled%2010.png)

- 회원가입 및 로그인

![Untitled](Porting%20Manual/Untitled%2011.png)

- SSL 발급 셋팅

![Untitled](Porting%20Manual/Untitled%2012.png)

![Untitled](Porting%20Manual/Untitled%2013.png)

![Untitled](Porting%20Manual/Untitled%2014.png)

- SSL 인증서을 받을 때 [google.com](http://google.com) 같은 사이트의 인증서 발급을 막기 위해서 도메인 인증을 해야합니다.

![Untitled](Porting%20Manual/Untitled%2015.png)

- 위에서 Name 과 Point To의 값을 가비아 DNS 관리툴에서 호스트 / 값에 추가 해줍니다.

![Untitled](Porting%20Manual/Untitled%2016.png)

- 인증 후 인증서 압축 파일을 발급받습니다.

![Untitled](Porting%20Manual/Untitled%2017.png)

## HTTPS 적용

### Front https

- Verify Domain 버튼을 눌러 도메인을 인증
- 성공한다면, Server Type을 Nginx로 선택한후, 인증서를 다운로드 받습니다.
- 압축을 풀고 /.nginx/cert 폴더에 저장합니다.

### Back https

- 백엔드에서 Https를 적용하기 위해서는 인증서를 pem키로 변환 해주어야 합니다.

```jsx
sudo openssl pkcs12 -export -out keystore.p12 -inkey private.key -in certificate.crt -certfile ca_bundle.crt
```

- 이후 생성된 keystore.p12 파일을 resources에 추가합니다.

![Untitled](Porting%20Manual/Untitled%2018.png)

- yaml 파일에 ssl 설정 값을 추가합니다.

```jsx
server:
  ssl:
    key-store: classpath:keystore.p12
    key-store-password: ssafy
    key-store-type: PKCS12
```

## 배포 shell 파일

```jsx
docker-compose -f docker-compose-prod.yml pull

COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose-prod.yml up --build -d

docker rmi -f $(docker images -f "dangling=true" -q) || true
```

## docker-compose-prod.yml

```jsx
version: "3"
services:
  server:
    container_name: server
    build:
      context: ./SHabit-back
      args:
        SERVER_MODE: prod
    ports:
      - 8080:8080
    environment:
      - TZ=Asia/Seoul
  client:
    container_name: client
    build:
      context: ./shabit-front
      dockerfile: Dockerfile.dev
    ports:
      - 3000:3000
    depends_on:
      - server
  nginx:
    container_name: nginx
    build: ./.nginx
    depends_on:
      - server
      - client
    volumes:
      - .nginx/conf.d:/etc/nginx/conf.d
      - .nginx/zerossl:/var/www/zerossl/.well-known/pki-validation
      - .nginx/cert:/cert
    ports:
      - 80:80
      - 443:443
```

### 빌드 절차

- Gitalb에서 Jenkins로 Webhooks을 연동한 다음 해당 브랜치에 push, merge 를 진행합니다.
    - start-prod.sh 쉘 파일 실행
    - docker-compose 실행
    - Dockerfile 실행
    - Server → Front  순으로 배포 진행
    

## 배포시 주의 사항

1. 프론트 엔드에서 서버 주소는 [shabit.site](http://shabit.site) 이므로 로컬 환경에서 구동할 시 [localhost](http://localhost) 로 변경해야합니다.
2. 백엔드는 prod, dev, local 세 가지 파일로 분리하여 ip 주소는 건들이지 않고 db 주소 및 계정 정보를 변경하면 됩니다.

## DB 정보

### Maria DB

```jsx
datasource:
    driver-class-name: org.mariadb.jdbc.Driver
    url: jdbc:mariadb://localhost:3306/ssafy
    username: easypeasy
    password: lemon
```

### Redis

```jsx
data:
    redis:
      host: localhost
      port: 6379

    mongodb:
      host: localhost
      port: 27017
      authentication-database: admin
      username: root
      password: root
      database: ssafy
```

## 외부 서비스 필요 정보

### OAuth2

```jsx
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: '135940431465-e82m01dj8rp1ufn8go11e5351052ri2q.apps.googleusercontent.com'
            client-secret: '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'
            redirect-uri: '{baseUrl}/{action}/oauth2/code/{registrationId}'
            scope: profile, email
          naver:
            client-id: '7Ok2n8mRGPoSxzGABJRc'
            client-secret: 'QeTRN6VlPc'
            redirect-uri: '{baseUrl}/{action}/oauth2/code/{registrationId}'
            authorization-grant-type: authorization_code
            scope:
              - name
              - email
              - profile_image
            client-name: Naver
          kakao:
            client-id: '7b4ce626e03d4f1361d309f6b93dd0a4'
            client-secret: 'yj34MVMX2Dl8IZPqzHSym8dC1ek7ZeiS'
            scope:
              - profile_nickname
              - account_email
              - profile_image
            client-name: Kakao
            authorization-grant-type: authorization_code
            redirect-uri: '{baseUrl}/{action}/oauth2/code/{registrationId}'
            client-authentication-method: POST

        provider:
          naver:
            authorization-uri: https://nid.naver.com/oauth2.0/authorize
            token-uri: https://nid.naver.com/oauth2.0/token
            user-info-uri: https://openapi.naver.com/v1/nid/me
            user-name-attribute: response
          kakao:
            authorization-uri: https://kauth.kakao.com/oauth/authorize
            token-uri: https://kauth.kakao.com/oauth/token
            user-info-uri: https://kapi.kakao.com/v2/user/me
            user-name-attribute: id
```

### SMTP

```jsx
spring:
	mail:
	    host: smtp.gmail.com
	    port: 587
	    username: ssafyezpz
	    password: lclsylxuudaclbwc
	    properties:
	      mail:
	        smtp:
	          auth: true
	          starttls:
	            enable: true
```

### S3 Buket

```jsx
cloud:
  aws:
    s3:
      bucket: shabit
    region:
      static: ap-northeast-2 #Asia Pacific -> seoul
    stack:
      auto: false
    credentials:
      access-key: AKIARYFPHUBQGRUEKLLL
      secret-key: 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
```