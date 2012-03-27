
test:
	@./node_modules/.bin/mocha \
		--timeout 500 \
		--reporter dot \
		--require should

.PHONY: test