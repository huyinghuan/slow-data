
/*
  生成上下文数据
  @author ec.huyinghuan@gmail.com
  @date 2014/11/10
 */

(function() {
  module.exports = function(exp) {
    var content, reg, type;
    type = 'context';
    reg = /^\@([^@].*)$/;
    if (!reg.test(exp)) {
      return void 0;
    }
    content = exp.replace(reg, '$1');
    return {
      type: type,
      options: content
    };
  };

}).call(this);
