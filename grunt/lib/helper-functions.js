exports.generatecURL = function(options){
	//echo curl -H "Authorization:Basic $credentials" "$url/v1/organizations/$org/apis/$application/revisions" -X GET
	var optionsl = JSON.parse(JSON.stringify(options));
	var curl = require('curl-cmd');
	optionsl.auth = optionsl.auth.user + ":" + optionsl.auth.password
	optionsl.hostname = options.uri.replace('https://', '')
	optionsl.path = optionsl.hostname.substring(optionsl.hostname.indexOf('/'));
	optionsl.hostname = optionsl.hostname.replace(optionsl.path, '')
	console.log(curl.cmd(optionsl, {ssl: true, verbose: true}));
}

exports.setNodeResources = function(dir, options, files){
	var fs = require('fs');
	var task = {};
	if (fs.existsSync('./node')) {
		task.options = options;
		task.files = files
	}
	return task;
}

exports.prompts = function(grunt) {
	return {
		target: {
		  options: {
		    questions: [
		      {
		        config: 'username',
		        type: 'input',
		        message: 'Apigee Edge EMail',
		        when: function(){
		        	return !grunt.option('username');
		        }
		      },
		      {
		        config: 'password', // arbitrary name or config for any other grunt task
		        type: 'password', // list, checkbox, confirm, input, password
		        message: 'Apigee Edge Password', // Question to ask the user, function needs to return a string,
		        when: function(){
		        	return !grunt.option('password');
		        }
		      }
		    ],
	        then : function(results, done){
	        	if(results.username) {grunt.config("apigee_profiles." + grunt.option('env') + ".username", results.username);}
	        	if(results.password) {grunt.config("apigee_profiles." + grunt.option('env') + ".password", results.password);}
	        	done();
	        	return true;
	        }
		  }
		}
	}
}