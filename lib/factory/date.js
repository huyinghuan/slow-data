(function() {
  var _moment;

  _moment = require('moment');

  module.exports = function(options) {
    var def;
    return def = {
      now: true,
      min: "1970-1-1",
      max: _moment().format('YYYY-MM-DD')
    };
  };

}).call(this);
