(function() {
  var testNumber, testString, _number, _string;

  _number = require('./../type/number');

  _string = require('./../type/string');

  testNumber = function() {
    var index, queue, _i, _len, _results;
    queue = ["$number", "$number[1]", "$number[2,3]", "$number[3,2,1]"];
    _results = [];
    for (_i = 0, _len = queue.length; _i < _len; _i++) {
      index = queue[_i];
      _results.push(console.log(_number(index)));
    }
    return _results;
  };

  testString = function() {
    var index, queue, _i, _len, _results;
    queue = ["$string", "$string[]", "$string()", "$string[1]", "$string[2,3]", "$string[3, 12, 1]", "$string[3,12,1,1,0,0]", "$string[3, 22, 1, true, false]"];
    _results = [];
    for (_i = 0, _len = queue.length; _i < _len; _i++) {
      index = queue[_i];
      _results.push(console.log(_string(index)));
    }
    return _results;
  };

  testString();

}).call(this);
