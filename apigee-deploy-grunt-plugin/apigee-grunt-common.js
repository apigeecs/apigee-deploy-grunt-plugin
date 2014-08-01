var request = require('request');

exports.retrieveDeployedApiRevisions = function (apigee, callback) {
	var options = {
		method: 'GET',
		uri: apigee.url_mgmt + '/v1/o/' + apigee.org + '/environments/' + apigee.env + '/apis/' + apigee.apiproxy + '/deployments',
		//uri : apigee.url_mgmt + '/v1/o/testmyapi/apis/forecastweather-grunt-plugin-api/revisions/91/deployments?action=undeploy&env=test',
		//uri: apigee.url_mgmt + '/v1/o/' + apigee.org + '/apis/' + apigee.apiproxy + '/revisions/' + ,		
		auth: {
			user: apigee.username,
			password: apigee.password
		}      
	};
	request(options, callback);
};

exports.undeployApiRevision = function(apigee, revision, callback){
	var options = {
		method: 'POST',
		uri: apigee.url_mgmt + '/v1/o/' + apigee.org + '/apis/' + apigee.apiproxy + '/revisions/' + apigee.revision + "/deployments?action=undeploy&env=" + apigee.env,
		auth: {
			user: apigee.username,
			password: apigee.password
		},
		headers : {
			'Content-Type' : 'application/octet-stream',
		},			
	};
	// function callback(error, response, body) {
	// 	if (!error && response.statusCode == 200) {
	// 		var info = JSON.parse(body);
	// 		grunt.log.writeln(body);
	// 	}
	// 	grunt.log.writeln(response.statusCode)
	// 	grunt.log.writeln(response.status)      
	// 	done(response.statusCode == 200);
	// }
	request(options, callback);
}