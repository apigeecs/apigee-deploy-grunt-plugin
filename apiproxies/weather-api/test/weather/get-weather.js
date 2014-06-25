var http = require('http');
var assert = require('chai').assert
var expect = require('chai').expect
var request = require('request')

  describe('weather', function() {
	  it('verify payload contains location and query as property using request object!"', function (done) {

		    request('http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20geo.places%20WHERE%20text%3D%22SFO%22&format=json', function (error, response, body) {
		        var data_obj = JSON.parse(body);
		        expect(body).to.contain('12521721');
		        assert.deepProperty(data_obj, 'query');
		        assert.equal(200, response.statusCode);
		        done()

		    })
		  })
  });

  