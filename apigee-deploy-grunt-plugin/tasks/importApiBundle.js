module.exports = function(grunt) {
	grunt.registerTask('importApiBundle', 'Import API bundle under a API proxy name', function() {
		var done = this.async();    
		var request = require('request');
		var fs = require('fs');
		var rs = fs.createReadStream('target/' + grunt.config.get("apiproxy")  + '.zip');
		var options = {
			method: 'POST',
			url: grunt.config.get('apigee').url_mgmt + '/v1/organizations/' + grunt.config.get('apigee').org + '/apis?action=import&name=' + grunt.config.get('apigee').apiproxy,
			auth: {
				user: grunt.config.get('apigee').username,
				password: grunt.config.get('apigee').password
			},
			headers : {
				'Content-Type' : 'application/octet-stream',
			},
			strictSSL: false
		};
		rs.pipe(request(options, callback));
		function callback(error, response, body) {
			grunt.log.writeln(options.url)
			grunt.log.writeln(body);
			grunt.log.writeln(response.statusCode);
			done();
		}
	});	
};