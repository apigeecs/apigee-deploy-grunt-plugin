/*globals mocha:true */
var tests = [
   // Link Server-Side and Browser Tests Here
  'tests/app/bestPractices'
];


if (typeof window !== 'undefined') {
   // link to your client side tests here
   tests.push('tests/app/places-api/get/places');

} else {

  var requirejs = require('requirejs');
  requirejs.config({
    baseUrl : __dirname + '/../',
    nodeRequire : require,
    paths : {
      // Libraries
      underscore : 'lib/underscore',

      // Shim Plugin
      use : 'lib/plugins/use',
      text : 'lib/plugins/text',
      jquery : 'lib/jquery'
    },

    use : {
      underscore : {
        attach : '_'
      }
    }
  });
}

requirejs(tests, function() {
  if (typeof mocha !== 'undefined') {
    mocha.run();
  }
});
