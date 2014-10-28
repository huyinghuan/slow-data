(function() {
  var _;

  _ = require('lodash');

  module.exports = function(exp) {
    if (!_.isRegExp(exp)) {
      return void 0;
    }
    return {
      type: 'common',
      options: exp
    };
  };

}).call(this);
