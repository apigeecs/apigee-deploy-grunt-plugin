module.exports = function(grunt) {
	var apiproxy = 'forecastweather-grunt-plugin-api';
	var org = 'testmyapi' // replace with organization
	var env = 'test';     // replace with environment
	var url_mgmt = 'https://api.enterprise.apigee.com'; // for cloud environments, leave as is
	var username = grunt.option('username'); // pass credentials as arguments as grunt task --username=$ae_username --password=$ae_password
	var password = grunt.option('password');
	// Project configuration.
	grunt.initConfig({
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
						return 'target/' + apiproxy + ".zip"
					}
				},
				files: [
				{expand: true, cwd: 'target/apiproxy/', src: ['**'], dest: 'apiproxy/' }, // makes all src relative to cwd
				]
			}
		},

		})

	grunt.loadNpmTasks('grunt-mkdir');
	// Default task(s).
	grunt.registerTask('default', ['clean', 'mkdir','copy','compress', 'retrieveLastApiRevisionDeployed', 'importApiBundleDeployed']);
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.registerTask('importAPI', 'Import API bundle task.', function() {
		var request = require('request');
		grunt.log.writeln(this.name);
	});

	grunt.registerTask('retrieveLastApiRevisionDeployed', 'Retrieve Last API revision deployed.', function() {
		var done = this.async();    
		var request = require('request');
		var options = {
			method: 'GET',
			uri: url_mgmt + '/v1/o/' + org + '/environments/' + env + '/apis/' + apiproxy + '/deployments',
			auth: {
				user: username,
				password: password
			}      
		};
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);
				grunt.log.writeln(body);
			}
			grunt.log.writeln(response.statusCode)
			grunt.log.writeln(response.status)      
			done(response.statusCode == 200);
		}
		request(options, callback);
	});

	grunt.registerTask('importApiBundleDeployed', 'Retrieve Last API revision deployed.', function() {
		var done = this.async();    
		var request = require('request');
		var fs = require('fs');
		var rs = fs.createReadStream('target/' + apiproxy + '.zip');
		var options = {
			method: 'POST',
			url: url_mgmt + '/v1/organizations/' + org + '/apis?action=import&name=' + apiproxy,
			auth: {
				user: username,
				password: password
			},
			headers : {
				'Content-Type' : 'application/octet-stream',
			},
			strictSSL: false
		};
		rs.pipe(request(options, callback));
		function callback(error, response, body) {
			grunt.log.writeln(options.url)
			grunt.log.writeln(body);
			grunt.log.writeln(response.statusCode);
			done();
		}
	});
};