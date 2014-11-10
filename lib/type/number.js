
/*
  生成数字
  $number(min, max, fixed)
  @author ec.huyinghuan@gmail.com
  @date:  14/11/10
  @type: update
 */

(function() {
  var vertify, _;

  _ = require('lodash');

  vertify = function(options) {
    var key, value;
    for (key in options) {
      value = options[key];
      if ((!_.isNumber(value)) || parseInt(value) !== value) {
        return false;
      }
    }
    return true;
  };

  module.exports = function(exp) {
    var args, orig, reg, result, type;
    type = "number";
    orig = ["$number", "$number()"];
    if (_.indexOf(orig, exp) !== -1) {
      return {
        type: type
      };
    }
    reg = /^\$number\([\d\,\ ]*\)$/;
    if (!reg.test(exp)) {
      return void 0;
    }
    args = exp.match(/\d+/g);
    if (args.length === 0) {
      return {
        type: type
      };
    }
    if (args.length === 1) {
      args[1] = +args[0];
      args[0] = 0;
      args[2] = 0;
    }
    if (args.length === 2) {
      args[2] = 0;
    }
    result = {
      type: type,
      options: {
        min: +args[0],
        max: +args[1],
        fixed: +args[2]
      }
    };
    if (!vertify(result.options)) {
      throw new Error("invalid arguments");
    }
    return result;
  };

}).call(this);
