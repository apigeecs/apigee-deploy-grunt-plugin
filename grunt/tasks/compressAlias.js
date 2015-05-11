/*jslint node: true */

module.exports = function(grunt) {
	'use strict';
	grunt.registerTask('compressAlias', 'compress alias task that conditionally runs compress task.', function() {
	    grunt.log.debug('Node.js modules not include in API bundle.');
	    var targetsFiltered = [];
		Object.keys(grunt.config('compress')).forEach(function (i){
			if(!grunt.option('upload-modules') && i == 'node-modules'){
				grunt.log.debug('skipped node-modules compress file');
				return;
			}else{
				targetsFiltered.push('compress:' + i);
			}
		})
	  grunt.task.run(targetsFiltered || 'compress');
	});
};