build:
	docker-compose run --rm --entrypoint npm app i

prod:
	docker-compose -f docker-compose.prod.yml up