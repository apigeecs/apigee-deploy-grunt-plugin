module.exports = function(grunt) {
	var apigee_conf = require('./apigee-config.js')
	require('load-grunt-tasks')(grunt);
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		apigee_profiles : apigee_conf.profiles(grunt),//{
			clean: ["target"],
			mkdir: {
				all: {
					options: {
						create: ['target']
					},
				},
			},
			copy: {
				main: {
					src: 'apiproxy/**',
					dest: 'target/',
				},
			},
		// make a zipfile
		compress: {
			main: {
				options: {
					mode : 'zip',
					archive: function(){
						var ap = grunt.config.get("apigee_profiles")
						return 'target/' + ap[ap.env].apiproxy + ".zip"
					}
				},
				files: [
				{expand: true, cwd: 'target/apiproxy/', src: ['**'], dest: 'apiproxy/' }, // makes all src relative to cwd
				]
			}
		},
		// task for configuration management: search and replace elements within XML files  
		xmlpoke: apigee_conf.config(apigee_conf.profiles(grunt).env),
	    // Configure a mochaTest task
	    // mochaTest: {
	    //   test: {
	    //     options: {
	    //       reporter: 'spec'
	    //     },
	    //     src: ['test/**/*.js']
	    //   }
	    // }
		mochaTest: {
		  test: {
		    options: {
		      reporter: 'spec',
		      require: 'blanket',
		      timeout : 5000
		    },
		    src: ['test/**/*.js']
		  },
		  coverage: {
		    options: {
		      reporter: 'html-cov',
		      // use the quiet flag to suppress the mocha console output
		      quiet: true,
		      // specify a destination file to capture the mocha
		      // output (the quiet option does not suppress this)
		      captureFile: 'coverage.html'
		    },
		    src: ['test/**/*.js']
		  }
		}	    
	})

	// Default task(s).
	//delete and then import revision keeping same id
	grunt.registerTask('default', ['clean', 'mkdir','copy', 'xmlpoke','compress',
		'getDeployedApiRevisions', 'force:on','undeployApiRevision',
							'deleteApiRevision', 'force:restore', 'importApiRevision', 'deployApiRevision', 'executeTests']);

	grunt.registerTask('test', 'mochaTest')
	grunt.loadTasks('tasks');
	if(grunt.option.flags().indexOf('--help') == -1 && !apigee_conf.profiles(grunt).env)
		grunt.fail.fatal('Invalid environment flag --env={env}. Provide environment as argument, see apigee_profiles in Grunfile.js.')
};
