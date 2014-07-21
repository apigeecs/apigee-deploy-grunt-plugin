module.exports = function(grunt) {
	grunt.registerTask('undeployApiRevision', 'Undeploy API revision', function() {
		//echo curl -H "Authorization:Basic $credentials" "$url/v1/organizations/$org/apis/$application/revisions/$RevToUndeploy/deployments?action=undeploy&env=$environment" -X POST -H "Content-Type: application/octet-stream"
		var done = this.async();    
		var request = require('request');
		var options = {
			method: 'GET',
			uri: url_mgmt + '/v1/o/' + org + '/environments/' + env + '/apis/' + apiproxy + '/revision' + revToUndeploy + "/deployments?action=undeploy&env=" + env,
			auth: {
				user: username,
				password: password
			},
			headers : {
				'Content-Type' : 'application/octet-stream',
			},			
		};
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);
				grunt.log.writeln(body);
			}
			grunt.log.writeln(response.statusCode)
			grunt.log.writeln(response.status)      
			done(response.statusCode == 200);
		}
		request(options, callback);
	});	
};