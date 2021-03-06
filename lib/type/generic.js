
/*
  无需格式化的数据类型 $(hello)
  author: ec.huyinghuan@gmail.com
  date: 2014.11.04
 */

(function() {
  var _utils;

  _utils = require('../utils');

  module.exports = function(exp) {
    var content, reg, type;
    reg = /^\$\((.*)\)$/;
    if (!reg.test(exp)) {
      return void 0;
    }
    type = _utils.getFileName(__filename);
    content = exp.replace(reg, "$1");
    return {
      type: type,
      options: content
    };
  };

}).call(this);
