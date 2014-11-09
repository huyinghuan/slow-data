(function() {
  var _;

  _ = require('lodash');

  module.exports = function(exp) {
    var args, error, max, min, options, orig, reg, type;
    type = "string";
    orig = ["$string", "$string()"];
    if (_.indexOf(orig, exp) !== -1) {
      return {
        type: type
      };
    }
    reg = /^\$string\((.*)\)$/;
    if (!reg.test(exp)) {
      return void 0;
    }
    args = exp.replace(reg, "$1");
    try {
      args = JSON.parse("[" + args + "]");
    } catch (_error) {
      error = _error;
      return void 0;
    }
    options = {};
    if (args.length === 1) {
      max = args[0];
      if (!_.isNumber(max)) {
        return void 0;
      }
      options.min = options.max = max;
      return {
        type: type,
        options: options
      };
    }
    min = +args[0];
    max = +args[1];
    if (_.isNaN(min) || _.isNaN(max)) {
      return void 0;
    }
    options.max = max;
    options.min = min;
    if (args.length === 2) {
      return {
        type: type,
        options: options
      };
    }
    if (args[2] != null) {
      options.special = !!args[2];
    }
    if (args[3] != null) {
      options.number = !!args[3];
    }
    if (args[4] != null) {
      options.sensitive = args[4];
    }
    return {
      type: type,
      options: options
    };
  };

}).call(this);
