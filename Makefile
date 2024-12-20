#	# ${DOCKER_CMP} -f ./services/nginx/docker-compose.yaml -p nginx-proxy up -d
DOCKER_CMP := docker compose
PROJECT_NAME := fzs_klussen

all:
	mkdir -p ./content/categories
	mkdir -p ./content/serviceCards
	$(DOCKER_CMP) -p $(PROJECT_NAME) up --build -d

down:
	$(DOCKER_CMP) -p $(PROJECT_NAME) down

clean:
	$(DOCKER_CMP) -p $(PROJECT_NAME) down --remove-orphans
	$(DOCKER_CMP) -p $(PROJECT_NAME) down --rmi local

fclean: clean
	$(DOCKER_CMP) -p $(PROJECT_NAME) down -v
	docker volume rm $$(docker volume ls -q -f "label=com.docker.compose.project=$(PROJECT_NAME)") 2>/dev/null || true
	docker network rm $$(docker network ls -q -f "label=com.docker.compose.project=$(PROJECT_NAME)") 2>/dev/null || true

check:
	npx depcheck

.PHONY: all down clean fclean check dirs
