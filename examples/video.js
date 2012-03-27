
var Jog = require('..')
  , log = new Jog(new Jog.FileStore('/tmp/jog'));

var users = ['manny', 'tobi', 'loki'];

// generate some video logs

users.forEach(function(user){
  log.info('rendering video', { user: user, duration: 1000 });
  log.info('compiling video', { user: user, duration: 2000 });
  log.info('uploading video', { user: user, duration: 1200,  timestamp: Date.now() + 60000 });
});

// grep data for tobi

var stream = log.stream()
  , ms = 0;

stream.on('data', function(obj){
  if (obj.user != 'tobi') return;
  ms += obj.duration;
});

stream.on('end', function(){
  console.log('took %ds to process tobi\'s data', ms / 1000);
});