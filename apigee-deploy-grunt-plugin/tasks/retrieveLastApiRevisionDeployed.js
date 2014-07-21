module.exports = function(grunt) {
	grunt.registerTask('retrieveLastApiRevisionDeployed', 'Retrieve Last API revision deployed', function() {
		var done = this.async();    
		var request = require('request');
		var options = {
			method: 'GET',
			uri: grunt.config.get("url_mgmt") + '/v1/o/' + grunt.config.get("org") + '/environments/' + grunt.config.get("env") + '/apis/' + grunt.config.get("apiproxy") + '/deployments',
			auth: {
				user: grunt.config.get("username"),
				password: grunt.config.get("password")
			}      
		};
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);
				grunt.log.writeln(body);
			}
			grunt.log.writeln(response.statusCode)
			done(response.statusCode == 200);
		}
		request(options, callback);
	});
};
