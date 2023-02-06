docker-compose pull

COMPOSE_DOCKER_CLI_BUILD=1 

DOCKER_BUILDKIT=1 

docker-compose up --build -d

docker rmi $(docker images -f "dangling=true" -q) -f