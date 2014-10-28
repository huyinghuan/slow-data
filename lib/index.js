(function() {
  var SlowData, _http, _utils;

  _http = require('http');

  _utils = require('./utils');

  SlowData = (function() {
    function SlowData() {}

    SlowData.prototype.init = function(routerConfig, schemaDirectory) {};

    SlowData.prototype.start = function(port) {};

    SlowData.prototype.gen = function(exp) {
      return _utils.gen(exp);
    };

    SlowData.prototype.genObject = function(schema) {
      return _utils.genObj(schema);
    };

    return SlowData;

  })();

  module.exports = new SlowData();

}).call(this);
