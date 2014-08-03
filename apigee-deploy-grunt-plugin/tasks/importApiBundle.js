'use strict';

var grunt_common = require('../apigee-grunt-common.js');

module.exports = function(grunt) {
	grunt.registerTask('importApiRevision', 'Import API bundle under a API proxy name', function() {
		var importedBundle = function(error, response, body) {
			if (!error && response.statusCode == 201) {
				var importBundleRes = JSON.parse(body);
				grunt.option('revision', importBundleRes.revision);
			}else{
			}
			grunt.log.debug(response.statusCode)
			grunt.log.debug(body);
			done(error);
		}
		var done = this.async();
		grunt_common.importApiBundle(grunt.config.get('apigee_profiles'), importedBundle)
	});
};
