(function() {
  var genField, genObj, getSchemaModules, schema, _, _path, _sload, _utils;

  _ = require('lodash');

  _sload = require('sload');

  _path = require('path');

  _utils = require('./utils');

  module.exports = schema = function() {};

  genField = function(exp, modules) {
    var build, classify, classifyList, e, factory, options, _i, _len;
    options = {
      ignore: function(exp) {
        var type;
        type = _utils.getFileName(exp);
        return !modules[type];
      }
    };
    classifyList = _sload.scan('type', __dirname, options);
    factory = void 0;
    try {
      for (_i = 0, _len = classifyList.length; _i < _len; _i++) {
        classify = classifyList[_i];
        factory = classify(exp);
        if (factory === void 0) {
          continue;
        }
        break;
      }
    } catch (_error) {
      e = _error;
      factory = void 0;
    }
    if (factory === void 0) {
      factory = {
        type: "undefined",
        options: exp
      };
    }
    build = _sload(factory.type, _path.join(__dirname, "factory"));
    try {
      return build(factory.options);
    } catch (_error) {
      e = _error;
      return exp;
    }
  };

  genObj = function(schema, modules) {
    var key, obj, value;
    if (!_.isPlainObject(schema)) {
      return {};
    }
    obj = {};
    for (key in schema) {
      value = schema[key];
      obj[key] = genField(value, modules);
    }
    return obj;
  };

  getSchemaModules = function(moduleEnable, moduleAvailables) {
    var defaultModules, definedModules, options;
    options = {
      ignore: function(exp) {
        var type;
        type = _utils.getFileName(exp);
        return !moduleEnable[type];
      }
    };
    defaultModules = _sload.scan('type', __dirname, options);
    return definedModules = _sload.scan;
  };

  schema.getSchemaModules = getSchemaModules;

  schema.genField = genField;

  schema.genObj = genObj;

}).call(this);
