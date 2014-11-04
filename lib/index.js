(function() {
  var SlowData, _http, _schema;

  _http = require('http');

  _schema = require('./schema');

  SlowData = (function() {
    function SlowData() {}

    SlowData.prototype.init = function(routerConfig, schemaDirectory) {};

    SlowData.prototype.start = function(port) {};

    SlowData.prototype.gen = function(exp) {
      return _schema.genField(exp);
    };

    SlowData.prototype.genObject = function(bean) {
      return _schema.genObj(bean);
    };

    SlowData.prototype.buildSchema = function(schema) {};

    return SlowData;

  })();

  module.exports = new SlowData();

}).call(this);
