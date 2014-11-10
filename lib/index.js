(function() {
  var SlowData, _, _fs, _http, _path, _schema, _sload, _special, _utils;

  _http = require('http');

  _ = require('lodash');

  _fs = require('fs');

  _sload = require('sload');

  _path = require('path');

  _schema = require('./schema');

  _utils = require('./utils');

  _special = require('./special/index');

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
      return this.templateFunctionList = _schema.getTemplateFunctionList(this.options.templateEnable, this.templateAvailableType);
    };

    SlowData.prototype.genSpecialField = function(exp, context) {
      var e, field, group, queue, _i, _len;
      try {
        group = _special.getTemplateGroup(exp);
      } catch (_error) {
        e = _error;
        console.warn("Can't resolve mixture group");
        return exp;
      }
      queue = [];
      for (_i = 0, _len = group.length; _i < _len; _i++) {
        field = group[_i];
        queue.push(this.gen(field, context));
      }
      return queue.join('');
    };

    SlowData.prototype.gen = function(exp, context) {
      var build, e, func;
      if (context == null) {
        context = {};
      }
      if (_special.isSpecial(exp)) {
        return this.genSpecialField(exp, context);
      }
      func = _schema.getTemplateFunction(exp, this.templateFunctionList, this.templateAvailableFactory);
      if (!func.buildPath) {
        return exp;
      }
      build = require(func.buildPath);
      try {
        return build.apply(context, func["arguments"]);
      } catch (_error) {
        e = _error;
        console.log(e.stack);
        return exp;
      }
    };

    SlowData.prototype.genObject = function(bean, context) {
      var key, obj, value;
      if (context == null) {
        context = {};
      }
      if (!_.isPlainObject(bean)) {
        return {};
      }
      obj = {};
      for (key in bean) {
        value = bean[key];
        obj[key] = this.gen(value, context);
      }
      return obj;
    };

    SlowData.prototype.build = function(schemaPlain, context) {
      var bean, index, length, queue, schema, _i;
      if (context == null) {
        context = {};
      }
      schema = _schema.getSchema(schemaPlain, this.schemaDirectroy);
      console.log(schema);
      if (!_.isPlainObject(schema)) {
        return schemaPlain;
      }
      bean = schema.module;
      length = schema.length;
      if (length === void 0) {
        return this.genObject(bean, _.extend(context, {
          index: 0
        }));
      }
      queue = [];
      for (index = _i = 0; 0 <= length ? _i <= length : _i >= length; index = 0 <= length ? ++_i : --_i) {
        queue.push(this.genObject(bean, _.extend(context, {
          index: index
        })));
      }
      return queue;
    };

    return SlowData;

  })();

  module.exports = SlowData;

}).call(this);
