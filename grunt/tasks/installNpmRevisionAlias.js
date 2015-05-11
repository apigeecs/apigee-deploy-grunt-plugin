/*jslint node: true */

module.exports = function(grunt) {
	'use strict';
	grunt.registerTask('installNpmRevisionAlias', 'install npm API revision alias.', function() {
	    //grunt.log.debug('Node.js modules not include in API bundle.');
	    switch (grunt.cli.tasks[0]){
	    	case 'UPDATE_CURRENT_REVISION' :
	    		grunt.task.run('installNpmRevision:' + grunt.option('revisions_undeployed').name);
	    		break;
	    	case 'IMPORT_DEPLOY_BUMP_REVISION' :
	    		grunt.task.run('installNpmRevision:' + grunt.option('revision'));
	    		break;
	    	case 'DEPLOY_IMPORT_BUMP_SEAMLESS_REVISION' :
	    		grunt.task.run('installNpmRevision:' + grunt.option('revision'));
	    		break;
	    	default :
	    		grunt.task.run('installNpmRevision:' + grunt.option('revision'));
	    		break;
		}
	});
};
