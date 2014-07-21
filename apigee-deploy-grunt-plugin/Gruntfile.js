module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);		
	//require('load-grunt-config')(grunt);
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		apiproxy : 'forecastweather-grunt-plugin-api',
		org : grunt.option('org') || 'testmyapi', // replace with organization
		env : grunt.option('env') || 'test',     // replace with environment
		url_mgmt : 'https://api.enterprise.apigee.com',  // for cloud environments, leave as is
		username : grunt.option('username') || process.env.ae_username, // pass credentials as arguments as grunt task --username=$ae_username --password=$ae_password
		password : grunt.option('password') || process.env.ae_password, // use ae_username and ae_password are defined as environment variables and no arguments are passed
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
						return 'target/' + grunt.config.get("apiproxy")  + ".zip"
					}
				},
				files: [
				{expand: true, cwd: 'target/apiproxy/', src: ['**'], dest: 'apiproxy/' }, // makes all src relative to cwd
				]
			}
		},

		})

	// Default task(s).
	grunt.registerTask('default', ['clean', 'mkdir','copy','compress', 'retrieveLastApiRevisionDeployed', 'importApiBundle']);
	grunt.loadTasks('tasks');	
};