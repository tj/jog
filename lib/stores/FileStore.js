
/**
 * Module dependencies.
 */

var EventEmitter = require('events').EventEmitter
  , debug = require('debug')('jog:file')
  , path = require('path')
  , fs = require('fs');

/**
 * Expose `FileStore`.
 */

module.exports = FileStore;

/**
 * Initialize a `FileStore` with the given `path`.
 *
 * @param {String} path
 * @api public
 */

function FileStore(path) {
  debug('filestore %s', path);
  if (!path) throw new Error('path required');
  this.path = path;
  this.write = fs.createWriteStream(path, { flags: 'a' });
}

/**
 * Add `obj` to the file.
 *
 * @param {Object} obj
 * @api private
 */

FileStore.prototype.add = function(obj){
  debug('add %j', obj);
  this.write.write(JSON.stringify(obj) + '\n');
};

/**
 * Clear and invoke `fn()`.
 *
 * @param {Function} fn
 * @api private
 */

FileStore.prototype.clear = function(fn){
  var self = this;
  debug('clear');
  path.exists(this.path, function(yes){
    if (!yes) return fn();
    debug('unlink %s', self.path);
    fs.unlink(self.path, fn)
  });
};

/**
 * Return an `EventEmitter` which emits "data"
 * and "end" events.
 *
 * @return {EventEmitter}
 * @api private
 */

FileStore.prototype.stream = function(){
  var emitter = new EventEmitter
    , stream = fs.createReadStream(this.path, { flags: 'a+' })
    , buf = ''
    , substr
    , obj
    , i;

  stream.setEncoding('utf8');
  stream.on('data', function(chunk){
    buf += chunk
    while (~(i = buf.indexOf('\n'))) {
      substr = buf.slice(0, i);
      if ('' == substr) break;
      obj = JSON.parse(substr);
      emitter.emit('data', obj);
      buf = buf.slice(i + 1);
    }
  });

  stream.on('end', function(){
    emitter.emit('end');
  });

  return emitter;
};
