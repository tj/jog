
var Jog = require('..')
  , log = new Jog(new Jog.FileStore('/tmp/graph'))
  , Canvas = require('canvas')
  , canvas = new Canvas(300, 300)
  , ctx = canvas.getContext('2d')
  , fs = require('fs');

// regular logs
var n = Math.random() * 100 | 0;
while (n--) log.info('something happened');

// error logs
log.error('something broke');
log.error('something broke');
log.error('something broke');

// graph log levels

var stream = log.stream();
var info = 0;
var error = 0;

stream.on('data', function(obj){
  if ('error' == obj.level) ++error;
  if ('info' == obj.level) ++info;
});

stream.on('end', function(){
  var w = 300, h = 300;
  var max = Math.max(info, error);

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = .5;
  ctx.fillStyle = 'black';

  // info
  ctx.fillRect(5, 0, w / 2 - 10, h);

  // error
  ctx.fillStyle = 'red';
  var height = h * (error / max);
  ctx.fillRect(w / 2, h - height, w / 2 - 5, height);

  fs.writeFile('graph.png', canvas.toBuffer());
  console.log('saved ./graph.png');
});