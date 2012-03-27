
var Jog = require('../');

describe('RedisStore', function(){
  require('./shared/Store')(new Jog.RedisStore);
})