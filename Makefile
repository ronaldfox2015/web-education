.DEFAULT_GOAL := help

BUILD_TIMESTAMP ?= `date +%Y%m%d`
VERSION			:= nginx
USER         := ronaldfox2020
TAG_DEV			:= $(USER)/orbis-training-docker:$(VERSION)
IMAGE := php-base
USER_DOCKER := ronaldfox2020
PASWORD_DOCKER := ramirez2015 

start:
	docker run -d -p 80:80  -v "$(PWD)/app/web:/var/www/html"  jguillermo/alpine-php:nginx

login: ## login de docker: make login
	@docker login

build: ## construccion de la imagen: make build, make build  IMAGE=php-nginx VERSION=nginx 
	docker build -f docker/$(IMAGE)/Dockerfile -t $(TAG_DEV) docker/$(IMAGE)/;

create-network:
	docker network create $(NAME)

test:
	@make build VERSION=test
	@make create-network NAME=test
	docker run -it --net=test $(USER)/orbis-training-docker:test curl nginx:3030

push: ## Subir imagen al dockerhub: make push
	@make login
	@docker push $(TAG_DEV)

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-16s\033[0m %s\n", $$1, $$2}'
