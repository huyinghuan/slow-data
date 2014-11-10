
/*
  修改字段生成相关条件
  author: ec.huyinghuan@gmail.com
  date: 14-11.08
 */

(function() {
  var getSchema, getTemplateFunction, getTemplateFunctionList, schema, _, _fs, _path, _sload, _utils;

  _ = require('lodash');

  _sload = require('sload');

  _path = require('path');

  _fs = require('fs');

  _utils = require('./utils');

  module.exports = schema = function() {};

  getTemplateFunctionList = function(templateEnable, templateAvailable) {
    var availablePath, functions, options, _i, _len;
    if (templateEnable == null) {
      templateEnable = {};
    }
    if (templateAvailable === void 0) {
      templateAvailable = [_path.join(__dirname, 'type')];
    }
    options = {
      ignore: function(filename) {
        var type;
        type = _utils.getFileName(filename);
        return templateEnable[type] === false;
      }
    };
    functions = [];
    for (_i = 0, _len = templateAvailable.length; _i < _len; _i++) {
      availablePath = templateAvailable[_i];
      functions = functions.concat(_sload.scan(availablePath, options));
    }
    return functions;
  };

  getTemplateFunction = function(expression, functions, templateAvailable) {
    var buildPath, classify, e, factory, factoryPath, tmpPath, _i, _j, _len, _len1;
    if (templateAvailable === void 0) {
      templateAvailable = [_path.join(__dirname, 'factory')];
    }
    factory = void 0;
    try {
      for (_i = 0, _len = functions.length; _i < _len; _i++) {
        classify = functions[_i];
        factory = classify(expression);
        if (factory === void 0) {
          continue;
        }
        break;
      }
    } catch (_error) {
      e = _error;
      console.warn("Can't resolve " + expression);
      console.log(e.stack);
      factory = void 0;
    }
    if (factory === void 0) {
      factory = {
        type: "undefined",
        options: expression
      };
    }
    buildPath = void 0;
    for (_j = 0, _len1 = templateAvailable.length; _j < _len1; _j++) {
      factoryPath = templateAvailable[_j];
      tmpPath = _path.join(factoryPath, factory.type);
      if (_fs.existsSync("" + tmpPath + ".js") || _fs.existsSync("" + tmpPath + ".coffee")) {
        buildPath = tmpPath;
        break;
      }
    }
    return {
      buildPath: buildPath,
      "arguments": [factory.options]
    };
  };

  getSchema = function(schema, schemaDirectory) {
    var bean, e, filePath;
    if (_.isPlainObject(schema)) {
      return schema;
    }
    if (!_.isString(schema)) {
      return false;
    }
    try {
      filePath = _path.join(schemaDirectory, schema);
      bean = require(filePath);
    } catch (_error) {
      e = _error;
      console.log(e.stack);
      return false;
    }
    return bean;
  };

  schema.getSchema = getSchema;

  schema.getTemplateFunctionList = getTemplateFunctionList;

  schema.getTemplateFunction = getTemplateFunction;

}).call(this);
