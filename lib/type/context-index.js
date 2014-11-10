
/*
  获取上下文的索引
  @author ec.huyinghuan@gmail.com
  @date 14-11.09
  @index
 */

(function() {
  var _;

  _ = require('lodash');

  module.exports = function(exp) {
    var content, orig, reg, result, type;
    type = "context-index";
    orig = ["@index", "@index()"];
    if (_.indexOf(orig, exp) !== -1) {
      return {
        type: type
      };
    }
    reg = /^\@\@index\(([\+\*-\/]),\s*(\d+)\)$/;
    if (!reg.test(exp)) {
      return void 0;
    }
    content = exp.replace(reg, '$1,$2');
    content = content.split(',');
    result = {
      type: type,
      options: {
        action: content[0],
        step: content[1]
      }
    };
    return result;
  };

}).call(this);
