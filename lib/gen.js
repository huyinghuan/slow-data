(function() {
  var _RandExp;

  _RandExp = require('randexp');

  module.exports = function(reg) {
    return new _RandExp(reg).gen();
  };

}).call(this);
