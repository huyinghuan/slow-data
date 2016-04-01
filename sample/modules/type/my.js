(function() {
  module.exports = function(exp) {
    var content, reg, type;
    type = 'my';
    reg = /^\$my\((.*)\)$/;
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
