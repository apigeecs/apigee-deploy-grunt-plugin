/*globals mocha:true */
var tests = [
// Link Server-Side and Browser Tests Here
'tests/app/bestPractices', 
'tests/app/places-api/get/places' 

];

var requirejs = require('requirejs');
requirejs.config({
	baseUrl : __dirname + '/../',
	nodeRequire : require,
	paths : {
		// Libraries
		underscore : 'lib/underscore',

		// Shim Plugin
		use : 'lib/plugins/use',
		text : 'lib/plugins/text'
	},

	use : {
		underscore : {
			attach : '_'
		}
	}
});

requirejs(tests, function() {
	if (typeof mocha !== 'undefined') {
		mocha.run();
	}
});
