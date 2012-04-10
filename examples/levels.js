
var Jog = require('..')
  , log = new Jog(new Jog.FileStore('/tmp/levels.log'))
  , id = 0;

setInterval(function(){
  log.info('something happened', { user: 'tobi' });
}, 1000);

setInterval(function(){
  log.error('something broke', { user: 'jane', errorid: id++ });
}, 4000);
