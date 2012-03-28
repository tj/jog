
REPORTER = spec

test:
	@./node_modules/.bin/mocha \
		--slow 100 \
		--timeout 500 \
		--reporter $(REPORTER) \
		--require should \
		test/jog.js \
		test/FileStore.js \
		test/RedisStore.js \
		--grep "remain open"

.PHONY: test