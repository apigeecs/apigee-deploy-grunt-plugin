/*jshint expr:true*/
/*globals describe:true, it:true, expect:true, beforeEach:true */

var http = require('http')
var assert = require('chai').assert
var expect = require('chai').expect
var request = require('request')


define([
  'tests/app/bestPractices'
], function() {
  describe('best practices', function(){

    it('you should declare functions safely', function() {
      expect('a').to.eql('a');
    })


  })
})
