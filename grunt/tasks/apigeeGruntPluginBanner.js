/*jslint node: true */
var FONTS = require('cfonts');


module.exports = function(grunt) {
	'use strict';
	grunt.registerTask("apigeeGruntPluginBanner", 'Display Apigee Grunt Plugin Banner', function(set){
		var fonts = new FONTS({
		    'text': 'Apigee Grunt Plugin', //text to be converted
		    'font': 'block', //define the font face
		    'colors': ['red','blue'], //define all colors
		    'background': 'black', //define the background color
		    'letterSpacing': 1, //define letter spacing
		    'space': true, //define if the output text should have empty lines on top and on the bottom
		    'maxLength': '12' //define how many character can be on one line
		});
		new FONTS({
		    'text': 'Welcome to Apigee Grunt Plugin!', //text to be converted
		    'font': 'console', //define the font face
		    'colors': ['red'], //define all colors
		    'background': 'blue', //define the background color
		    'letterSpacing': 10, //define letter spacing
		    'space': true, //define if the output text should have empty lines on top and on the bottom
		    'maxLength': '12' //define how many character can be on one line
		});
	});
}
