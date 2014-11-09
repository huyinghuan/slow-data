(function() {
  var _, _gen;

  _ = require('lodash');

  _gen = require('../gen');

  module.exports = function(options) {
    var def, exp, limit, reg, value;
    def = {
      min: 6,
      max: 12,
      special: false,
      number: false,
      sensitive: false
    };
    _.extend(def, options);
    limit = "{" + def.min + "," + def.max + "}";
    exp = "";
    if (def.special) {
      exp = "[A-z]";
    } else {
      exp = "[a-z]|[A-Z]";
    }
    if (def.number) {
      exp = "" + exp + "|[0-9]";
    }
    reg = ["(", exp, ")", limit].join("");
    reg = new RegExp(reg);
    value = _gen(reg);
    if (def.sensitive === 'upper') {
      return value.toUpperCase();
    }
    if ('lower') {
      if (def.sensitive) {
        return value.toLowerCase();
      }
    }
    return value;
  };

}).call(this);
