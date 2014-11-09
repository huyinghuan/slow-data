
/*
  上下文索引
  @author ec.huyinghuan@gmail.com
  @date 14-11.09
  @index
 */

(function() {
  var _;

  _ = require('lodash');

  module.exports = function(options) {
    var defOptions, index, step;
    defOptions = {
      action: '+',
      step: 0
    };
    if (options) {
      _.extend(defOptions, options);
    }
    step = +defOptions.step;
    if (isNaN(step)) {
      step = 0;
    }
    index = this.index;
    switch (defOptions.action) {
      case '+':
        index = index + step;
        break;
      case '-':
        index = index - step;
        break;
      case '*':
        index = index * step;
        break;
      case '/':
        index = index / step;
    }
    if (isNaN(index)) {
      index = 0;
    }
    return index;
  };

}).call(this);
