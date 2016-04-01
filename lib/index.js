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
      if (_.isPlainObject(schemaDirectory)) {
        options = schemaDirectory;
        schemaDirectory = false;
      }
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
      var e, error, field, group, i, len, queue;
      try {
        group = _special.getTemplateGroup(exp);
      } catch (error) {
        e = error;
        console.warn("Can't resolve mixture group");
        return exp;
      }
      queue = [];
      for (i = 0, len = group.length; i < len; i++) {
        field = group[i];
        queue.push(this.gen(field, context));
      }
      return queue.join('');
    };

    SlowData.prototype.gen = function(exp, context) {
      var build, e, error, func;
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
      } catch (error) {
        e = error;
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
      var bean, i, index, length, queue, ref, schema;
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
      for (index = i = 0, ref = length; 0 <= ref ? i <= ref : i >= ref; index = 0 <= ref ? ++i : --i) {
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
