
/*
  正则表达式 $regexp(/[a-z]/)
  author: ec.huyinghuan@gmail.com
  date: 14.11.05
 */

(function() {
  var _utils;

  _utils = require('../utils');

  module.exports = function(exp) {
    var content, reg, type;
    reg = /\$regexp\((.*)\)$/;
    if (!reg.test(exp)) {
      return void 0;
    }
    type = _utils.getFileName(__filename);
    content = exp.replace(reg, "$1");
    return {
      type: type,
      options: new RegExp(content)
    };
  };

}).call(this);
