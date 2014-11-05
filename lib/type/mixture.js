
/*
  混合对象 $mixture["$string", "$number", "$(adc)"]
  author: ec.huyinghuan@gmail.com
  date: 2014.11.05
 */

(function() {
  var _utils;

  _utils = require('../utils');

  module.exports = function(exp) {
    var arr, arrStr, reg, type;
    reg = /^\$mixtrue(\[.*\])$/;
    if (!reg.test(exp)) {
      return void 0;
    }
    type = _utils.getFileName(__filename);
    arrStr = exp.replace(/\$mixtrue/, "");
    return arr = JSON.parse(arrStr);
  };

}).call(this);
