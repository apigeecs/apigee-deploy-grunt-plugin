'use strict';

var grunt_common = require('../apigee-grunt-common.js');

module.exports = function(grunt) {
	grunt.registerTask('getAllApiRevisions', 'Retrieve all API revisions', function() {
		var apiRevisions = function(error, response, body) {
			grunt.log.debug(response.statusCode)			
			grunt.log.debug(body);
			done();
		}
		var done = this.async();
		grunt_common.getAllApiRevisions(grunt.config.get('apigee_profiles'), apiRevisions)
	});
};
