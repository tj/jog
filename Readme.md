
# jog

  JSON logging & reporting inspired by Loggly.

## jog(1)

```
  Usage: jog [options]

  Options:

    -h, --help         output usage information
    -V, --version      output the version number
<<<<<<< HEAD
=======
    -q, --query <str>  query with the given string
>>>>>>> tailf
    -F, --file <path>  load from the given <path>
    -R, --redis        load from redis store
    -s, --select <fn>  use the given <fn> for filtering
    -m, --map <fn>     use the given <fn> for mapping
```

<<<<<<< HEAD
### Examples

  View all logs from tobi:

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

## Stores

  By default Jog ships with the `FileStore` and `RedisStore`, however anything
  with the following methods implemented will work:
  
    - `add(obj)` to add a log object
    - `stream() => EventEmitter` to stream data
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

=======
>>>>>>> tailf
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