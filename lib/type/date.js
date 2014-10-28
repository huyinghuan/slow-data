(function() {
  var _;

  _ = require('lodash');

  module.exports = function(exp) {
    var orig, type;
    type = "date";
    orig = ["$date", "$date[]", "$date()"];
    if (_.indexOf(orig, exp) !== -1) {
      return {
        type: type
      };
    }
  };

}).call(this);
