
/*
  生成time数据(new Date().getTime())
  author: ec.huyinghuan@gmail.com
  date: 14.11.06
  $time(start, step)
  $time or $time() 当前时间
 */

(function() {
  var _;

  _ = require('lodash');

  module.exports = function(exp) {
    var orig, reg, type;
    type = 'time';
    orig = ["$time", "$time()"];
    if (_.indexOf(orig, exp) !== -1) {
      return {
        type: type
      };
    }
    return reg = /^\$time\(()\)$/;
  };

}).call(this);
