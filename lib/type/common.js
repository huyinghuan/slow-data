(function() {
  var _;

  _ = require('lodash');

  module.exports = function(exp) {
    var type;
    if (!_.isRegExp(exp)) {
      return void 0;
    }
    type = 'common';
    return {
      type: type,
      options: exp
    };
  };

}).call(this);
