(function() {
  var SlowData, _, _http, _schema;

  _http = require('http');

  _ = require('lodash');

  _schema = require('./schema');

  SlowData = (function() {
    function SlowData() {
      this.modules = require('./modules');
      console.log(this.modules);
    }

    SlowData.prototype.init = function(schemaDirectory, configure) {
      if (configure == null) {
        configure = {};
      }
      return this.modules = _.extend({}, this.modules, configure);
    };

    SlowData.prototype.gen = function(exp) {
      return _schema.genField(exp, this.modules);
    };

    SlowData.prototype.genObject = function(bean) {
      return _schema.genObj(bean, this.modules);
    };

    SlowData.prototype.build = function(schema) {};

    return SlowData;

  })();

  module.exports = new SlowData();

}).call(this);
