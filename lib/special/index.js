(function() {
  var queue, _utils;

  _utils = require('../utils');

  queue = [/^\$\$\((.*)\)$/];

  exports.isSpecial = function(exp) {
    var reg, _i, _len;
    for (_i = 0, _len = queue.length; _i < _len; _i++) {
      reg = queue[_i];
      if (reg.test(exp)) {
        return true;
      }
    }
    return false;
  };

  exports.getTemplateGroup = function(exp) {
    var arrStr, reg;
    reg = /^\$\$\((.*)\)$/;
    arrStr = exp.replace(reg, "$1");
    return JSON.parse("[" + arrStr + "]");
  };

}).call(this);
