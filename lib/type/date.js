
/*
  $date(start, end, step, format)
  生成日期数据
  author: ec.huyinghuan@gmail.com
  date: 14-11.06
 */

(function() {
  var _;

  _ = require('lodash');

  module.exports = function(exp) {
    var orig, type;
    type = "date";
    orig = ["$date", "$date()"];
    if (_.indexOf(orig, exp) !== -1) {
      return {
        type: type
      };
    }
  };

}).call(this);
