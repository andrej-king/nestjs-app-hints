init: docker-down \
	docker-build \
	docker-up \
	api-install-dependencies

down: docker-down
lint: api-lint
lint-fix: api-lint-fix

tests: test-unit test-e2e
test-e2e: api-test-e2e
test-unit: api-test-unit

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

# examples:
# TYPE=module NAME=auth make api-generate-schematic
# TYPE=class NAME="product/product.model" PARAMS="--no-spec" make api-generate-schematic
# TYPE=controller NAME=auth PARAMS="--no-spec" make api-generate-schematic
# TYPE=service NAME=product PARAMS="--no-spec" make api-generate-schematic
api-generate-schematic:
	docker-compose run --rm node-cli sh -c 'nest g ${TYPE} ${NAME} ${PARAMS}'

# npm install
api-install-dependencies:
	docker-compose run --rm node-cli npm install --force

api-lint:
	docker-compose run --rm node-cli npm run lint

api-lint-fix:
	docker-compose run --rm node-cli npm run lint:fix

# USER_ID=${UID} make api-permissions
api-permissions:
	docker run --rm -v ${PWD}/app:/app -w /app alpine chown -R ${USER_ID}:${USER_ID} .

api-test-e2e:
	docker-compose run --rm node-cli npm run test:e2e

api-test-unit:
	docker-compose run --rm node-cli npm run test
