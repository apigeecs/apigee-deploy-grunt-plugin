var request = require('request');

exports.getDeployedApiRevisions = function (apigee_profiles, callback) {
	var apigeel = apigee_profiles[apigee_profiles.env];
	//echo curl -H "Authorization:Basic $credentials" "$url/v1/organizations/$org/apis/$application/revisions/$RevToUndeploy/deployments" -X GET
	var options = {
		method: 'GET',
		uri: apigeel.url_mgmt + '/v1/o/' + apigeel.org + '/environments/' + apigeel.env + '/apis/' + apigeel.apiproxy + '/deployments',
		auth: {
			user: apigeel.username,
			password: apigeel.password
		}
	};
	request(options, callback);
};

exports.undeployApiRevision = function(apigee_profiles, revision, callback){
	//echo curl -H "Authorization:Basic $credentials" "$url/v1/organizations/$org/apis/$application/revisions/$RevToUndeploy/deployments?action=undeploy&env=$environment" -X POST -H "Content-Type: application/octet-stream"
	var apigeel = apigee_profiles[apigee_profiles.env];
	var options = {
		method: 'POST',
		uri: apigeel.url_mgmt + '/v1/o/' + apigeel.org + '/apis/' + apigeel.apiproxy + '/revisions/' + revision + "/deployments?action=undeploy&env=" + apigeel.env,
		auth: {
			user: apigeel.username,
			password: apigeel.password
		},
		headers : {
			'Content-Type' : 'application/octet-stream',
		},
	};
	request(options, callback);
}

exports.deployApiRevision = function(apigee_profiles, revision, callback){
	//echo curl -H "Authorization:Basic $credentials" "$url/v1/organizations/$org/apis/$application/revisions/$RevToDeploy/deployments?action=deploy&env=$environment" -X POST -H "Content-Type: application/octet-stream"
	//curl -X POST -H 'Content-type:application/x-www-form-urlencoded' https://api.enterprise.apigee.com/v1/o/testmyapi/environments/test/apis/forecastweather-grunt-plugin-api/revisions/86/deployments\?override\=true\&delay\=10
	var apigeel = apigee_profiles[apigee_profiles.env];
	var options = {
		method: 'POST',
		uri: apigeel.url_mgmt + '/v1/o/' + apigeel.org + '/e/' + apigeel.env + '/apis/' + apigeel.apiproxy + '/revisions/' + revision + '/deployments' + (apigeel.override ? '?override=true' : '') + ((apigeel.override && apigeel.delay != 0) ? '&delay=' + apigeel.delay : ''),
		auth: {
			user: apigeel.username,
			password: apigeel.password
		},
		headers : {
			'Content-Type' : 'application/x-www-form-urlencoded',
		},
	};
    request(options, callback);
}

exports.getAllApiRevisions = function(apigee_profiles, callback){
	//echo curl -H "Authorization:Basic $credentials" "$url/v1/organizations/$org/apis/$application/revisions" -X GET
	var apigeel = apigee_profiles[apigee_profiles.env];
	var options = {
		method: 'GET',
		uri: apigeel.url_mgmt + '/v1/o/' + apigeel.org + '/apis/' + apigeel.apiproxy + '/revisions',
		auth: {
			user: apigeel.username,
			password: apigeel.password
		},
		headers : {
			'Content-Type' : 'application/octet-stream',
		},
	};
	request(options, callback);
}

exports.deleteApiRevision = function(apigee_profiles, revision, callback){
	//echo -H "Authorization:Basic $credentials" -X DELETE "$url/v1/organizations/$org/apis/$application/revisions/$RevToUndeploy"
	var apigeel = apigee_profiles[apigee_profiles.env];
	var options = {
		method: 'DELETE',
		uri: apigeel.url_mgmt + '/v1/o/' + apigeel.org + '/apis/' + apigeel.apiproxy + '/revisions/' + revision,
		auth: {
			user: apigeel.username,
			password: apigeel.password
		},
		headers : {
			'Content-Type' : 'application/octet-stream',
		},
	};
	request(options, callback);
}

exports.importApiBundle = function(apigee_profiles, callback){
		var apigeel = apigee_profiles[apigee_profiles.env];
		var fs = require('fs');
		var rs = fs.createReadStream('target/' + apigeel.apiproxy + '.zip');
		var options = {
			method: 'POST',
			url: apigeel.url_mgmt + '/v1/organizations/' + apigeel.org + '/apis?action=import&name=' + apigeel.apiproxy,
			auth: {
				user: apigeel.username,
				password: apigeel.password
			},
			headers : {
				'Content-Type' : 'application/octet-stream',
			},
			strictSSL: false
		};
		rs.pipe(request(options, callback));
}
