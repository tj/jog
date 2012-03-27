
test:
	@./node_modules/.bin/mocha \
		--timeout 500 \
		--reporter spec \
		--require should \
		test/jog.js \
		test/FileStore.js \
		test/RedisStore.js \
		--grep "remain open"

.PHONY: test