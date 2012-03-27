
var Jog = require('..')
  , log = new Jog(new Jog.RedisStore)
  , id = 0;

function again() {
  log.info('something happend', { id: ++id });
  setTimeout(again, Math.random() * 100 | 0);
}

again();

log.stream({ end: false, interval: 100 })
  .on('data', function(line){
    console.log(line);
  });