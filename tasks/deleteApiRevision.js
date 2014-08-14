'use strict';

var grunt_common = require('../libs/apigee-grunt-common.js');

module.exports = function(grunt) {
	grunt.registerTask('deleteApiRevision', 'Delete an API revision. e.g. grunt deleteApiRevision:{revision_id}', function(revision) {
		if(!grunt.option('keep-last-revision')){
			var deleteRevision = function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var deletionResult = JSON.parse(body);
				}else{
				}
			grunt.log.debug(response.statusCode)
			grunt.log.debug(body);
			done();
			}
			var revisionl = revision || (grunt.option('revisions_undeployed') && grunt.option('revisions_undeployed').revision);
			if(!revisionl){
				grunt.fail.warn('invalid revision. e.g. grunt deleteApiRevision:{revision_id}');
			}
			var done = this.async();
			grunt_common.deleteApiRevision(grunt.config.get('apigee_profiles'), revisionl, deleteRevision, grunt.option.flags().indexOf('--curl')!= -1)
		}
		else{
			grunt.log.ok('task skipped. Remove --keep-last-revision flag to delete undeployed revision.')
		}
	});
};
