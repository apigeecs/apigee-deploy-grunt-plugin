var grunt_common = require('../apigee-grunt-common.js');
var request = require('request');

module.exports = function(grunt) {
	grunt.registerTask('undeployApiRevision', 'Undeploy an API revision. --revision={revision_id} or --revision=last', function() {
		//echo curl -H "Authorization:Basic $credentials" "$url/v1/organizations/$org/apis/$application/revisions/$RevToUndeploy/deployments?action=undeploy&env=$environment" -X POST -H "Content-Type: application/octet-stream"
		var done = this.async();
		var deployedRevisions = function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var deployment = JSON.parse(body);
				grunt.log.writeln('Undeploying revision: ' + deployment.name)
			}else{
				grunt.log.writeln(response.statusCode)
				done(false);
			}
			grunt.log.writeln(body);
			done();
		}
		var undeployedRevision = function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var undeployResult = JSON.parse(body);
				grunt.log.writeln(undeployResult)
			}else{
				grunt.log.writeln(response.statusCode)
				done(false);
			}
			grunt.log.writeln(body);
			done();
		}
		var revision = grunt.option('revision');
		
		//core logic
		if(!revision){
			grunt.fail.fatal('invalid revision. provide either argument as --revision=x or --revision=last');
		}
		if(revision === 'last'.toLowerCase()){
			grunt_common.retrieveDeployedApiRevisions(grunt.config.get('apigee'), deployedRevisions);
		}else{			
			grunt_common.undeployApiRevision(grunt.config.get('apigee'), revision, undeployedRevision)
		}
	});	
};

