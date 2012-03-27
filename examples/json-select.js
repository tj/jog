
var Jog = require('..')
  , select = require('JSONSelect')
  , log = new Jog(new Jog.FileStore('/tmp/json-select'));

var users = [];

var selector = select.compile('.user .age:expr(x > 2)');

users.push({ name: 'manny', age: 2, species: 'cat' });
users.push({ name: 'tobi', age: 2, species: 'ferret', cool: true });
users.push({ name: 'loki', age: 1, species: 'ferret', fat: true });
users.push({ name: 'jane', age: 5, species: 'ferret', bitchy: true });

// generate some video logs

users.forEach(function(user){
  log.info('rendering video', { user: user });
  log.info('compiling video', { user: user });
  log.info('uploading video', { user: user, timestamp: Date.now() + 60000 });
});

// grep data for old animals

var stream = log.stream();

stream.on('data', function(obj){
  if (selector.match(obj).length) {
    console.log('  %s : %s : %s', obj.level, obj.user.name, obj.msg);
  }
});
