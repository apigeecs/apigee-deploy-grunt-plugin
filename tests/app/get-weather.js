/*globals describe:true, it:true, expect:true, beforeEach:true */


if (typeof define !== 'function') { var define = require('amdefine')(module); }
var assert = chai.assert
var expect = chai.expect
/*
if (typeof assert !== 'function') { var assert = require('chai').assert; } else {   }
if (typeof expect !== 'function') { var expect = require('chai').expect; } else {  }
*/
//if (typeof request !== 'function') { var request = require('request'); }


	  describe('weather', function() {
		  it('Test the weather', function(){

			assert.equal(200, 200)
			var urlStr = 'http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20geo.places%20WHERE%20text%3D%22SFO%22&format=json';
				
			jQuery.ajax({
					  url: urlStr
					}).done(function() {
					 
					});
			
			
			/*
			  request('http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20geo.places%20WHERE%20text%3D%22SFO%22&format=json', function (error, response, body) {
			        var data_obj = JSON.parse(body);
			        expect(body).to.contain('12521721');
			        assert.deepProperty(data_obj, 'query');
			        assert.equal(200, response.statusCode);
			        done()
			  })
			*/
			  
		  });
	  });




