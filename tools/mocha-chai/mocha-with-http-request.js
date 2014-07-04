var http = require('http');
var assert = require('chai').assert
var expect = require('chai').expect
var request = require('request')

describe('/', function () {
  it('verify payload contains location and query as property using request object!"', function (done) {

    request('http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20geo.places%20WHERE%20text%3D%22SFO%22&format=json', function (error, response, body) {
        var data_obj = JSON.parse(body);
        expect(body).to.contain('12521721');
        assert.deepProperty(data_obj, 'query');
        assert.equal(200, response.statusCode);
        done()
    })
    
  })
})

describe('/', function () {
  it('verify payload contains location and query as property!"', function (done) {
    http.get('http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20geo.places%20WHERE%20text%3D%22SFO%22&format=json', function (res) {
      var data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        assert.ok('everything', 'everything is ok');
        expect('everthing').to.be.ok;
        var data_obj = JSON.parse(data);
        assert.deepProperty(data_obj, 'query');
        expect(data).to.contain('12521721');
        done();
      });
    });
  })
})


describe('/', function () {
  it('should return 200', function (done) {
   http.get('http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20geo.places%20WHERE%20text%3D%22SFO%22&format=json', function (res) {
    var data = '';

    res.on('data', function (chunk) {
      data += chunk;
    });
    assert.equal(200, res.statusCode);

    done();
  });
 })
})

/*var assert = require("assert")
var should = require('should');

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
})

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      [1,2,3].indexOf(5).should.equal(-1);
      [1,2,3].indexOf(0).should.equal(-1);
    })
  })
})*/