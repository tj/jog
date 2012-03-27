
var Jog = require('..')
  , log = new Jog(new Jog.FileStore('/tmp/map-reduce'));

var users = [];

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

// map/reduce videos uploaded by user species

var stream = log.stream();
var res = {};

stream.on('data', function(obj){
  if ('uploading video' != obj.msg) return;
  res[obj.user.species] = res[obj.user.species] || 0;
  res[obj.user.species]++;
});

stream.on('end', function(){
  for (var species in res) {
    console.log('  %s : %s', species, res[species]);
  }
});