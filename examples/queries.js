
var Jog = require('..')
  , log = new Jog(new Jog.FileStore('/tmp/query.log'));

function next() {
  var start = new Date;
  setTimeout(function(){
    var dur = new Date - start;
    log.info('query', { query: 'something', duration: dur });
    next();
  }, Math.random() * 500 | 0);
}

next();