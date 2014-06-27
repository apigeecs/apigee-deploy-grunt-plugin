if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([ 'jquery' ], function($) {
  return {
    async : function(value) {
      var dfd = $.Deferred();
      setTimeout(function() {
        dfd.resolve(value);
      }, 10);
      return dfd.promise();
    },

    getResponse : function(url) {
        var dfd = $.Deferred();

        $.ajax(url).then(function(resp) {
            dfd.resolve(resp);
          });
        return dfd.promise();
      },
    
    
  };
});
