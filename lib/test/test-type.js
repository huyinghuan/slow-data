(function() {
  var testGeneric, testMixture, testNumber, testRegexp, testString, _generic, _mixture, _number, _regexp, _string;

  _number = require('./../type/number');

  _string = require('./../type/string');

  _generic = require('./../type/generic');

  _regexp = require('./../type/regexp');

  _mixture = require('./../type/mixture');

  testNumber = function() {
    var index, queue, _i, _len, _results;
    queue = ["$number", "$number(1)", "$number(2,3)", "$number(3,2,1)"];
    _results = [];
    for (_i = 0, _len = queue.length; _i < _len; _i++) {
      index = queue[_i];
      _results.push(console.log(_number(index)));
    }
    return _results;
  };

  testString = function() {
    var index, queue, _i, _len, _results;
    queue = ["$string", "$string()", "$string(1)", "$string(2,3)", "$string(3, 12, 1)", "$string(3,12,1,1,0,0)", "$string(3, 22, 1, true, false)"];
    _results = [];
    for (_i = 0, _len = queue.length; _i < _len; _i++) {
      index = queue[_i];
      _results.push(console.log(_string(index)));
    }
    return _results;
  };

  testGeneric = function() {
    var index, queue, _i, _len, _results;
    queue = ["$(123)", '$(sta)'];
    _results = [];
    for (_i = 0, _len = queue.length; _i < _len; _i++) {
      index = queue[_i];
      _results.push(console.log(_generic(index)));
    }
    return _results;
  };

  testRegexp = function() {
    var index, queue, _i, _len, _results;
    queue = ["$regexp([a-z])", '$regexp(\\s)'];
    _results = [];
    for (_i = 0, _len = queue.length; _i < _len; _i++) {
      index = queue[_i];
      _results.push(console.log(_regexp(index)));
    }
    return _results;
  };

  testMixture = function() {
    var index, queue, _i, _len, _results;
    queue = ['$mixture("$string()", "$number()")'];
    _results = [];
    for (_i = 0, _len = queue.length; _i < _len; _i++) {
      index = queue[_i];
      _results.push(console.log(_mixture(index)));
    }
    return _results;
  };

}).call(this);
