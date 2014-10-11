module.exports = function(grunt) {
	'use strict';
	grunt.registerTask('saveGitRevision', function() {
		var git = require('git-rev')
		var done = this.async();
		git.log(function (array) {
		  var commit = array[0]
		  var gitRevision = "";
		  var os = require("os");
		  if(commit) {
		  	gitRevision = "git commit: " + commit[0].substring(0,7) + " by " + commit[3] + " on " + os.hostname();
		  	grunt.option('gitRevision', gitRevision);
		  }
		  done();
		})
	});
};