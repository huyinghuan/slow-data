(function() {
  var functions, testNumber, testObj, testString, _schema;

  _schema = require('../schema');

  functions = _schema.getTemplateFunctionList();

  testNumber = function() {
    var exp, queue, _i, _len, _results;
    queue = ["$number()", "$number[5]", "$number[1,100]", "$number[2,9,3]", "$number[a]", "$number[a(6,8)]"];
    _results = [];
    for (_i = 0, _len = queue.length; _i < _len; _i++) {
      exp = queue[_i];
      _results.push(console.log(_schema.getTemplateFunction(exp, functions)));
    }
    return _results;
  };

  testString = function() {
    var exp, queue, _i, _len, _results;
    queue = ["$string", "$string()", "$string(2,3)", '$string(3, 12, 1)', '$string(3,12,1,1,0)', '$string(3, 22, 1, true, 1)'];
    _results = [];
    for (_i = 0, _len = queue.length; _i < _len; _i++) {
      exp = queue[_i];
      _results.push(console.log(_schema.getTemplateFunction(exp, functions)));
    }
    return _results;
  };

  testString();

  testObj = function() {
    var schema;
    schema = {
      name: "$string[5]",
      age: "$number[1, 150]",
      email: /\w{8}@\w{2,5}\.\w{2,4}/,
      birth: "$date"
    };
    return console.log(_schema.genObj(schema));
  };

}).call(this);
