
var Jog = require('../');

describe('Jog', function(){
  it('should expose .RedisStore', function(){
    Jog.should.have.property('RedisStore');
  })

  it('should expose .FileStore', function(){
    Jog.should.have.property('FileStore');
  })

  describe('when invoked as a regular function', function(){
    it('should return a Jog', function(){
      Jog().should.be.an.instanceof(Jog);
    })
  })

  describe('#write(level, type, attrs)', function(){
    it('should .add() to the store', function(done){
      var store = {
        add: function(obj){
          obj.level.should.equal('info');
          obj.timestamp.should.be.a('number');
          obj.type.should.equal('something happened');
          done();
        }
      };

      var log = new Jog(store);
      log.info('something happened');
    })

    it('should handle error instances', function (done){
      var err = new Error('BOOM')

      var store = {
        add: function(obj){
          obj.error.should.equal(err.stack);
          obj.x.should.equal('y');
          done();
        }
      };

      var log = new Jog(store);
      log.error('something happened', { error: err, x: 'y' });
    })
  })

  describe('#ns(obj)', function(){
    it('should return a Jog', function(done){
      var store = {
        add: function(obj){
          obj.vid.should.equal('abc');
          obj.uid.should.equal('tobi');
          obj.level.should.equal('info');
          obj.timestamp.should.be.a('number');
          obj.type.should.equal('something happened');
          done();
        }
      };

      var log = new Jog(store);
      var orig = log;
      log = log.ns({ vid: 'abc' }).ns({ uid: 'tobi' });
      log.should.not.equal(orig);
      log.info('something happened');
    })
  })
})
