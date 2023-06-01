build:
	docker-compose run --rm --entrypoint npm app i

prod:
	docker-compose -f docker-compose.prod.yml up

app-install:
	docker-compose run --rm --entrypoint npm app install $(package)

app-dev-install:
	docker-compose run --rm --entrypoint npm app install -D $(package)

app-uninstall:
	docker-compose run --rm --entrypoint npm app uninstall $(package)