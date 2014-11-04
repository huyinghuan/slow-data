
/*
  无需格式化的数据类型 $(hello)
  author: ec.huyinghuan@gmail.com
  date: 2014.11.04
 */

(function() {
  var _utils;

  _utils = require('../utils');

  module.exports = function(exp) {
    var arr, content, reg, type;
    type = _utils.getFileName(__filename);
    reg = /^\$\((.*)\)$/;
    if (!reg.test(exp)) {
      return void 0;
    }
    arr = exp.match(reg);
    if (arr.length < 2) {
      return void 0;
    }
    content = arr[1];
    return {
      type: type,
      options: content
    };
  };

}).call(this);
