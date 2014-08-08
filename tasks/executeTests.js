'use strict';

module.exports = function(grunt) {
	grunt.registerTask('executeTests', 'execute tests when flag --skip_tests is absent.', function() {
		if(grunt.option.flags().indexOf('--skip_tests') == -1)
			grunt.task.run('mochaTest');
		else
			grunt.log.writeln('tests skipped. Remove --skip_tests to execute tests.');
	});
};
