/*jslint node: true */

module.exports = function(grunt) {
	'use strict';
	grunt.registerTask('deployApiRevisionAlias', 'Deploy an API revision alias', function() {
	    switch (grunt.cli.tasks[0]){
	    	case 'UPDATE_CURRENT_REVISION' :
	    		grunt.task.run('deployApiRevision:' + grunt.option('revisions_undeployed').name);
	    		break;
	    	case 'IMPORT_DEPLOY_BUMP_REVISION' :
	    		grunt.task.run('deployApiRevision:' + grunt.option('revision'));
	    		break;
	    	case 'DEPLOY_IMPORT_BUMP_SEAMLESS_REVISION' :
	    		grunt.task.run('deployApiRevision:' + grunt.option('revision'));
	    		break;
	    	default :
	    		grunt.task.run('deployApiRevision:' + grunt.option('revision'));
	    		break;
		}
	});
};
