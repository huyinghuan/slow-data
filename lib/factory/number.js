(function() {
  var _;

  _ = require('lodash');

  module.exports = function(options) {
    var defOptions, value;
    defOptions = {
      fixed: 0,
      min: -4294967296,
      max: 4294967296
    };
    _.extend(defOptions, options);
    value = Math.random() * (defOptions.max - defOptions.min) + defOptions.min;
    if (defOptions.fixed === 0) {
      return parseInt(value);
    }
    return value.toFixed(defOptions.fixed);
  };

}).call(this);
