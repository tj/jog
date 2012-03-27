
var Jog = require('../../')
  , fs = require('fs');

module.exports = function(store){
  describe('#stream()', function(){
    it('should emit "data" and "end" events', function(done){
      var log = new Jog(store);
      log.write('info', 'compiling video', { vid: 'abc' });
      log.write('info', 'uploading video', { vid: 'abc' });

      var stream = log.stream();
      var lines = [];

      stream.on('data', function(line){
        lines.push(line);
      }).on('end', function(){
        lines[0].should.have.property('timestamp');
        delete lines[0].timestamp;
        delete lines[1].timestamp;
        lines[0].should.eql({ vid: 'abc', level: 'info', msg: 'compiling video' });
        lines[1].should.eql({ vid: 'abc', level: 'info', msg: 'uploading video' });
        done();
      });
    })
  })

  describe('#clear(fn)', function(){
    it('should clear the data', function(done){
      var log = new Jog(store);
      log.write('info', 'compiling video', { vid: 'abc' });
      log.write('info', 'uploading video', { vid: 'abc' });
      log.clear(function(err){
        if (err) return done(err);
        var stream = log.stream();
        var lines = [];

        stream.on('data', function(line){
          lines.push(line);
        }).on('end', function(){
          lines.should.have.length(0);
          done();
        });
      })
    })
  })
}