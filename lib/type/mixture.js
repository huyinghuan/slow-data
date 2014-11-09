
/*
  混合对象 $$("$string", "$number", "$(ad,$c)")
  author: ec.huyinghuan@gmail.com
  date: 2014.11.05
 */

(function() {
  var _utils;

  _utils = require('../utils');

  module.exports = function(exp) {
    var arr, arrStr, options, reg, type;
    reg = /^\$\$\((.*)\)$/;
    if (!reg.test(exp)) {
      return void 0;
    }
    type = _utils.getFileName(__filename);
    arrStr = exp.replace(reg, "$1");
    arr = JSON.parse("[" + arrStr + "]");
    options = {
      types: arr
    };
    return {
      type: type,
      options: options
    };
  };

}).call(this);
