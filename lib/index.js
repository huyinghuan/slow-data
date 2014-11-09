(function() {
  var SlowData, _, _http, _path, _schema, _sload, _utils;

  _http = require('http');

  _ = require('lodash');

  _sload = require('sload');

  _path = require('path');

  _schema = require('./schema');

  _utils = require('./utils');

  SlowData = (function() {
    function SlowData(schemaDirectory, options) {
      this.schemaDirectroy = false;
      this.options = {
        templateEnable: require('./modules'),
        templateAvailable: [__dirname]
      };
      this.init(schemaDirectory, options);
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
      if (options.templateEnable) {
        _.extend(this.options.templateEnable, options.templateEnable);
      }
      if (options.templateAvailable) {
        this.options.templateAvailable = this.options.templateAvailable.concat(options.templateAvailable);
      }
      this.templateAvailableType = _.map(this.options.templateAvailable, function(filePath) {
        return _path.join(filePath, 'type');
      });
      this.templateAvailableFactory = _.map(this.options.templateAvailable, function(filePath) {
        return _path.join(filePath, 'factory');
      });
      return this.templateFunctionList = _schema.getTemplateFunctions(this.options.templateEnable, this.templateAvailableType);
    };

    SlowData.prototype.gen = function(exp) {
      return _schema.genField(exp, this.templateFunctionList, this.templateAvailableFactory);
    };

    SlowData.prototype.genObject = function(bean) {
      return _schema.genObj(bean, this.templateFunctionList, this.templateAvailableFactory);
    };

    SlowData.prototype.build = function(schema) {};

    return SlowData;

  })();

  module.exports = SlowData;

}).call(this);
