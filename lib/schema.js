(function() {
  var genField, genObj, utils, _, _path, _sload;

  _ = require('lodash');

  _sload = require('sload');

  _path = require('path');

  module.exports = utils = function() {};

  genField = function(exp) {
    var build, classify, classifyList, e, factory, _i, _len;
    classifyList = _sload.scan('type', __dirname);
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

  genObj = function(schema) {
    var key, obj, value;
    if (!_.isPlainObject(schema)) {
      return {};
    }
    obj = {};
    for (key in schema) {
      value = schema[key];
      obj[key] = genField(value);
    }
    return obj;
  };

  utils.genField = genField;

  utils.genObj = genObj;

}).call(this);
