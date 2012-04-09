
var Jog = require('..')
  , log = new Jog(new Jog.FileStore('/tmp/levels.log'));

setInterval(function(){
  log.info('something happened');
}, 1000);

setInterval(function(){
  log.error('something broke');
}, 4000);
