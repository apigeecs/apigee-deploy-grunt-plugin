/*globals describe:true, it:true, expect:true, beforeEach:true */

var http = require('http')
var assert = require('chai').assert
var expect = require('chai').expect
var request = require('request')

define([
  'tests/app/places-api/get/places'
], function() {
  describe('Yahoo Public API Test', function() {

    var options = {}

    it('you should be able to get places for text SFO from Yahoo.', function(done) {

       options = {
          url: 'http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20geo.places%20WHERE%20text%3D%22SFO%22&format=json',
            headers: {
                'User-Agent': 'request'
            }
       }

        request(options, function (error, response, body) {
            var data_obj = JSON.parse(body)
            expect(body).to.contain('12521721')
            assert.deepProperty(data_obj, 'query')
            assert.equal(200, response.statusCode)
            done()
        })

    })

    it('you should be able to get the womens shirts department', function(done) {
        request('http://www.llbean.com/llb/gnajax/607', function (error, response, body) {
            var data_obj = JSON.parse(body)

            expect(data_obj).to.contain('607')
            
            assert.equal(200, response.statusCode)
            done()
        })
    })

    it('you should be able use oauth', function(done) {
         done()
    })
    

  });
});
