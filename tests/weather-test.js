/*globals describe:true, it:true, expect:true*/
/*jslint node: true */

//var http = require('http')
var chai = require('chai')
var assert = require('chai').assert
var expect = require('chai').expect
var request = require('request'), chaiHttp = require('chai-http');

chai.use(chaiHttp);


  describe('ForecastWeather Public API Test', function() {

    var options = {}

    it('you should be able to get forecast weather for Sunnyvale-CA from this API Proxy.', function(done) {

       options = {
          url: 'https://testmyapi-test.apigee.net/weathergrunt/apigee/forecastrss?w=2502265',
            headers: {
                'User-Agent': 'request'
            }
       }

        request(options, function (error, response, body) {
            expect(body).to.contain('Sunnyvale')
            assert.equal(200, response.statusCode)
            done()
        })

    })

    it('you should be able to get forecast weather for Cali-Colombia from this API Proxy via a Node.js Target', function(done) {
       options = {
          url: 'https://testmyapi-test.apigee.net/weathergrunt/forecastweather_node/368149',
            headers: {
                'User-Agent': 'request'
            }
       }
        request(options, function (error, response, body) {
              expect(body).to.contain('Weather for Cali')
            assert.equal(200, response.statusCode)
            done()
        })

    })

    it('you should be able to retrieve image with content-type header image/jpg', function(done) {
      chai.request('https://testmyapi-test.apigee.net/weathergrunt/images')
        .get('/tree.jpg')
        .res(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.have.header('content-type','image/jpeg');
          done();
        });
    })

    it('you should be able use oauth', function(done) {
         done()
    })

    describe('you should be able to make a call to resource which executes a JavaCallout', function() {
      it('with a response "Payload set by a Java Callout"', function(done) {
        chai.request('https://testmyapi-test.apigee.net/weathergrunt')
          .get('/javacallout')
          .res(function (res) {
            //expect(res.content).to.contain('Weather for Cali')
            expect(res.text).to.contain('Payload set by a Java Callout')
            done();
          }); 
      })
    })

  });
