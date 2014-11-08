(function() {
  var SlowData, _, _http, _schema, _sload, _utils;

  _http = require('http');

  _ = require('lodash');

  _sload = require('sload');

  _schema = require('./schema');

  _utils = require('./utils');

  SlowData = (function() {
    function SlowData() {
      this.schemaDirectroy = false;
      this.options = {
        modulesEnable: require('./modules'),
        moduleAvailable: false
      };
      this.modules = [];
      this.refreshConfigure();
    }

    SlowData.prototype.init = function(schemaDirectory, options) {
      if (options == null) {
        options = {};
      }
      if (schemaDirectory) {
        this.schemaDirectroy = schemaDirectory;
      }
      return this.setOptions(options);
    };

    SlowData.prototype.setOptions = function(options) {
      if (options.modulesEnable) {
        _.extend(this.options.modulesEnable, options.modulesEnable);
      }
      if (options.moduleAvailable) {
        this.options.moduleAvailable = options.moduleAvailable;
      }
      return this.refreshConfigure();
    };

    SlowData.prototype.refreshConfigure = function() {
      return this.modulesList = _schema.getSchemaModules(this.options.modulesEnable, this.options.moduleAvailable);
    };

    SlowData.prototype.gen = function(exp) {
      return _schema.genField(exp, this.modulesList);
    };

    SlowData.prototype.genObject = function(bean) {
      return _schema.genObj(bean, this.modulesList);
    };

    SlowData.prototype.build = function(schema) {};

    return SlowData;

  })();

  module.exports = new SlowData();

}).call(this);
