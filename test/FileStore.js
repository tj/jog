
var Jog = require('../');

describe('FileStore', function(){
  require('./shared/Store')(new Jog.FileStore('/tmp/jog'));
})