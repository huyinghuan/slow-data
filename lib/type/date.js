
/*
  $date(start, step, format)
  生成日期数据
  author: ec.huyinghuan@gmail.com
  date: 14-11.06
 */

(function() {
  var _, _utils;

  _ = require('lodash');

  _utils = require('../utils');

  module.exports = function(exp) {
    var args, options, orig, reg, type;
    type = "date";
    orig = ["$date", "$date()"];
    if (_.indexOf(orig, exp) !== -1) {
      return {
        type: type
      };
    }
    reg = /^\$date\((.+)\)$/;
    if (!reg.test(exp)) {
      return void 0;
    }
    args = _utils.parseArguments(exp.replace(reg, '$1'));
    if (!args) {
      return void 0;
    }
    options = {};
    if (args[0] !== '') {
      options.start = args[0];
    }
    if (args[1] !== '') {
      options.step = args[1];
    }
    if (args[2] !== '') {
      options.format = args[2];
    }
    return {
      type: type,
      options: options
    };
  };

}).call(this);
