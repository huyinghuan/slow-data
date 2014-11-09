
/*
  修改字段生成相关条件
  author: ec.huyinghuan@gmail.com
  date: 14-11.08
 */

(function() {
  var genField, genObj, getTemplateFunctions, schema, _, _fs, _path, _sload, _utils;

  _ = require('lodash');

  _sload = require('sload');

  _path = require('path');

  _fs = require('fs');

  _utils = require('./utils');

  module.exports = schema = function() {};

  getTemplateFunctions = function(templateEnable, templateAvailable) {
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

  genField = function(expression, functions, templateAvailable) {
    var build, buildPath, classify, e, factory, factoryPath, tmpPath, _i, _j, _len, _len1;
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
    if (!buildPath) {
      return expression;
    }
    build = require(buildPath);
    try {
      return build(factory.options);
    } catch (_error) {
      e = _error;
      return expression;
    }
  };

  genObj = function(schema, functions, availableTemplates) {
    var key, obj, value;
    if (!_.isPlainObject(schema)) {
      return {};
    }
    obj = {};
    for (key in schema) {
      value = schema[key];
      obj[key] = genField(value, functions, availableTemplates);
    }
    return obj;
  };

  schema.getTemplateFunctions = getTemplateFunctions;

  schema.genField = genField;

  schema.genObj = genObj;

}).call(this);
