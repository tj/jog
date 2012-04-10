
# jog

  JSON logging & reporting inspired by Loggly.

## Installation

    $ npm install jog

## Features

  - namespace support
  - rich json documents
  - log levels
  - file store
  - redis store
  - document streaming
  - tail -f like streaming
  - CLI to tail and map / reduce logs

## API

### log.write(level, msg[, obj])

  Write to the logs:

```js
log.write(level, msg[, obj])
log.debug(msg[, obj])
log.info(msg[, obj])
log.warn(msg[, obj])
log.error(msg[, obj])
```

### log.ns(obj)

  Namespace with the given `obj`, returning a new `Jog` instance
  inheriting previous properties. You may call this several times
  to produce more and more specific loggers.

```js
var log = jog(new jog.FileStore('/tmp/log'));

// log a user 5
log = log.ns({ uid: 5 });

// log video id 99 for user 5
log = log.ns({ vid: 99 });

// or both at once
log = log.ns({ uid: 5, vid: 99 });
```

### log.stream(options)

  Return an `EventEmitter` emitting "data" and "end" events.

   - `end` when __false__ streaming will not end
   - `interval` the interval at which to poll (store-specific)

### log.clear(callback)

  Clear the logs and invoke the callback.

## Example

  Log random data using the `FileStore` and tail the file
  for changes (typically in different processes). Jog will add
  the `.level` and `.msg` properties for you.

```js
var jog = require('jog')
  , log = jog(new jog.FileStore('/tmp/tail'))
  , id = 0;

// generate random log data
function again() {
  log.info('something happened', { id: ++id, user: 'Tobi' });
  setTimeout(again, Math.random() * 100 | 0);
}

again();

// tail the json "documents"
log.stream({ end: false, interval: 500 })
  .on('data', function(obj){
    console.log(obj);
  });
```

yields:

```js
{ id: 1,
  level: 'info',
  msg: 'something happened',
  timestamp: 1332907641734 }
{ id: 2,
  level: 'info',
  msg: 'something happened',
  timestamp: 1332907641771 }
...
```

## jog(1)

```
  Usage: jog [options]
  
  Options:
  
    -h, --help         output usage information
    -V, --version      output the version number
    -f, --ignore-eof   do not stop on EOF
    -F, --file <path>  load from the given <path>
    -R, --redis        load from redis store
    -s, --select <fn>  use the given <fn> for filtering
    -m, --map <fn>     use the given <fn> for mapping
    -c, --color        color the json output
```

### Examples

  View all logs from tobi. The `_` object for the function
  bodies of `--select` and `--map` represents the current
  document, it's all just javascript.

```
jog --file /tmp/jog --select "_.user == 'tobi'"
[ { user: 'tobi',
    duration: 1000,
    level: 'info',
    msg: 'rendering video',
    timestamp: 1332861272100 },
  { user: 'tobi',
    duration: 2000,
    level: 'info',
    msg: 'compiling video',
    timestamp: 1332861272100 },
...
```

  Filter video compilation durations from "tobi" only:
  
```
$ jog --file /var/log/videos.log --select "_.user == 'tobi'" --map _.duration
[ 1000, 2000, 1200, 1000, 2000, 1200 ]
```

  Flags can be used several times:

```
jog --file /var/log/videos.log --select "_.vid < 5" --map _.msg --map "_.split(' ')"
[ [ 'compiling', 'video' ],
  [ 'compiling', 'video' ],
  [ 'compiling', 'video' ],
  [ 'compiling', 'video' ] ]
```

  Tail errors only, with color:

```
$ jog --file my.log -f -c --select '_.level == "error"'
{ level: 'error',
  msg: 'something broke',
  timestamp: 1333943982669 }
```

  Display error messages within the last 10 seconds:

```
$ jog -F my.log --level error --select "Date.now() - _.timestamp < 10000" --map _.msg
[ 'something broke', 'something broke', 'something broke' ]
```

## Stores

  By default Jog ships with the `FileStore` and `RedisStore`, however anything
  with the following methods implemented will work:
  
    - `add(obj)` to add a log object
    - `stream() => EventEmitter` to stream data
    - `stream({ end: false }) => EventEmitter` to stream data indefinitely
    - `clear(fn)` to clear the logs

### FileStore(path)

  Store logs on disk.

```js
var jog = require('jog');
var log = jog(new jog.FileStore('/var/log/videos.log'));
```

### RedisStore([client])

  Store logs in redis.

```js
var jog = require('jog');
var log = jog(new jog.RedisStore);
```

## Performance

  No profiling or optimizations yet but the `FileStore` can
  stream back 250,000 documents (~21MB) in 1.2 seconds on my
  macbook air.

  The `RedisStore` with 250,000 documents streamed back
  in 2.8 seconds on my air.

## Running tests

```
$ npm install
$ redis-server &
$ make test
```

## License 

(The MIT License)

Copyright (c) 2012 LearnBoost &lt;tj@learnboost.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.