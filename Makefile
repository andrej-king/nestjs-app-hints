init: docker-down \
	docker-build \
	docker-up \
	api-install-dependencies

down: docker-down
lint: api-lint
lint-fix: api-lint-fix

# docker run
docker-up:
	docker-compose up -d # --scale node=3

# docker down, remove old containers
docker-down:
	docker-compose down --remove-orphans

# docker down, remove old containers, remove volumes
docker-down-clear:
	docker-compose down -v --remove-orphans

# build docker images
docker-build:
	docker-compose build #--pull

api-generate-module:
	docker-compose run --rm node-cli sh -c 'nest g module ${NAME}'

# npm install
api-install-dependencies:
	docker-compose run --rm node-cli npm install

api-lint:
	docker-compose run --rm node-cli npm run lint

api-lint-fix:
	docker-compose run --rm node-cli npm run lint:fix
