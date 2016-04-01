
/*
  修改字段生成相关条件
  author: ec.huyinghuan@gmail.com
  date: 14-11.08
 */

(function() {
  var _, _fs, _path, _sload, _utils, getSchema, getTemplateFunction, getTemplateFunctionList, schema;

  _ = require('lodash');

  _sload = require('sload');

  _path = require('path');

  _fs = require('fs');

  _utils = require('./utils');

  module.exports = schema = function() {};

  getTemplateFunctionList = function(templateEnable, templateAvailable) {
    var availablePath, functions, i, len, options;
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
    for (i = 0, len = templateAvailable.length; i < len; i++) {
      availablePath = templateAvailable[i];
      functions = functions.concat(_sload.scan(availablePath, options));
    }
    return functions;
  };

  getTemplateFunction = function(expression, functions, templateAvailable) {
    var buildPath, classify, e, error, factory, factoryPath, i, j, len, len1, tmpPath;
    if (templateAvailable === void 0) {
      templateAvailable = [_path.join(__dirname, 'factory')];
    }
    factory = void 0;
    try {
      for (i = 0, len = functions.length; i < len; i++) {
        classify = functions[i];
        factory = classify(expression);
        if (factory === void 0) {
          continue;
        }
        break;
      }
    } catch (error) {
      e = error;
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
    for (j = 0, len1 = templateAvailable.length; j < len1; j++) {
      factoryPath = templateAvailable[j];
      tmpPath = _path.join(factoryPath, factory.type);
      if (_fs.existsSync(tmpPath + ".js") || _fs.existsSync(tmpPath + ".coffee")) {
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
    var bean, e, error, filePath;
    if (_.isPlainObject(schema)) {
      return schema;
    }
    if (!_.isString(schema)) {
      return false;
    }
    try {
      filePath = _path.join(schemaDirectory, schema);
      bean = require(filePath);
    } catch (error) {
      e = error;
      console.log(e.stack);
      return false;
    }
    return bean;
  };

  schema.getSchema = getSchema;

  schema.getTemplateFunctionList = getTemplateFunctionList;

  schema.getTemplateFunction = getTemplateFunction;

}).call(this);
