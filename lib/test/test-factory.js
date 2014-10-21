(function() {
  var genNumber, genRegexp, genString, _common, _number, _string;

  _string = require('./../factory/string');

  _number = require('./../factory/number');

  _common = require('./../factory/common');

  genString = function() {
    var i, options, _i, _results;
    options = {
      special: true,
      number: true,
      upper: true
    };
    _results = [];
    for (i = _i = 0; _i <= 10; i = ++_i) {
      _results.push(console.log(_string(options)));
    }
    return _results;
  };

  genNumber = function() {
    var i, options, _i, _results;
    options = {
      min: 0,
      max: 100,
      fixed: 2
    };
    _results = [];
    for (i = _i = 0; _i <= 10; i = ++_i) {
      _results.push(console.log(_number(options)));
    }
    return _results;
  };

  genRegexp = function() {
    var index, test, _i, _len, _results;
    test = [/([a-z]|[A-Z]){3,7}/, /([a-z]|[A-Z]|[0-9]){4,8}/, /([A-z0-9]){5}/];
    _results = [];
    for (_i = 0, _len = test.length; _i < _len; _i++) {
      index = test[_i];
      _results.push(console.log(_common(index)));
    }
    return _results;
  };

  genRegexp();

}).call(this);
