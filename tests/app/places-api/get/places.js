/*globals describe:true, it:true, expect:true, beforeEach:true */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
if (typeof expect !== 'function') { var expect = require('expect.js'); }

define([
  'app/places-api/get/places'
], function(answers) {
  describe('Yahoo Public API Test', function() {

    it('you should be able to get places for text SFO from Yahoo.', function(done) {
        var url = 'http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20geo.places%20WHERE%20text%3D%22SFO%22&format=json';

        answers.getResponse(url).then(function(resp) {
          expect(resp.query.results.place.name).to.eql("San Francisco International Airport");
          done();
        });

      });

  });
});
