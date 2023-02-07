git clone https://lab.ssafy.com/s08-webmobile1-sub2/S08P12A601.git
cd S08P12A601
docker-compose pull

COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up --build -d

docker rmi -f $(docker images -f "dangling=true" -q) || true
