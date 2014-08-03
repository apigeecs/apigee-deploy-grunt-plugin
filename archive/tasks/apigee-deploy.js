/*
 * grunt-apigee-deploy
 * https://github.com/apigeecs/apigee-deploy-grunt-plugin.git
 *
 * Kristopher Kleva <kkleva@llbean.com>
 * 
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md
  
  // ==========================================================================
  // INIT
  // ==========================================================================
  
  var apigeeDeploy = require('./lib/apigee-deploy').init(grunt)

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('apigee-deploy', 'Deploy my API Proxy', function() {
    var next = this.async();
    grunt.log.write(
      apigeeDeploy['deploy'](
        grunt.config(['apigee-deploy', this.target]),
        function(err) {
          if (err) {
            throw err;
          }
          next();
        }
      )
    );
  });

};
