module.exports = function(grunt) {
	grunt.registerTask('retrieveLastApiRevisionDeployed', 'Retrieve Last API revision deployed', function() {
		var done = this.async();    
		var request = require('request');
		var options = {
			method: 'GET',
			uri: grunt.config.get('apigee').url_mgmt + '/v1/o/' + grunt.config.get('apigee').org + '/environments/' + grunt.config.get('apigee').env + '/apis/' + grunt.config.get('apigee').apiproxy + '/deployments',
			auth: {
				user: grunt.config.get('apigee').username,
				password: grunt.config.get('apigee').password
			}      
		};
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);
				grunt.log.writeln(body);
				done();
			}
			grunt.log.writeln(response.statusCode)
			grunt.log.writeln(body)
			done();
		}
		request(options, callback);
	});
};
