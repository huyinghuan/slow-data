(function() {
  var _utils, queue;

  _utils = require('../utils');

  queue = [/^\$\$\((.*)\)$/];

  exports.isSpecial = function(exp) {
    var i, len, reg;
    for (i = 0, len = queue.length; i < len; i++) {
      reg = queue[i];
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
