(function() {
  var TestBase;

  require('colors');

  TestBase = (function() {
    function TestBase(typeStr) {
      this.typeStr = typeStr;
      this.init();
    }

    TestBase.prototype.init = function() {
      this.type = require("./../lib/type/" + this.typeStr);
      return this.factory = require("./../lib/factory/" + this.typeStr);
    };

    TestBase.prototype.testType = function(queue) {
      var index, j, len, results;
      results = [];
      for (j = 0, len = queue.length; j < len; j++) {
        index = queue[j];
        results.push(console.log(this.type(index)));
      }
      return results;
    };

    TestBase.prototype.testFactory = function(option) {
      var i, j, results;
      results = [];
      for (i = j = 0; j <= 10; i = ++j) {
        results.push(this.factory(options));
      }
      return results;
    };

    TestBase.prototype.testAll = function(queue, context) {
      var index, j, len, results, typeObj;
      if (context == null) {
        context = {};
      }
      results = [];
      for (j = 0, len = queue.length; j < len; j++) {
        index = queue[j];
        typeObj = this.type(index);
        if (typeObj) {
          results.push(console.log(("express: " + index + ", passed \n options: " + (JSON.stringify(typeObj)) + ",\n result: " + (this.factory.call(context, typeObj.options))).green));
        } else {
          results.push(console.log(("express: " + index + "  cann't resolve!").red));
        }
      }
      return results;
    };

    TestBase.prototype.getType = function() {
      return this.type;
    };

    TestBase.prototype.getFactory = function() {
      return this.factory;
    };

    return TestBase;

  })();

  module.exports = TestBase;

}).call(this);
