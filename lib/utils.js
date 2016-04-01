
/*
  工具类集合
  author: ec.huyinghuan@gmail.com
  date: 2014.11.04
 */

(function() {
  var _path, utils;

  _path = require('path');

  module.exports = utils = {};

  utils.getFileName = function(fileName) {
    var dirs, filename, index;
    dirs = fileName.split(_path.sep);
    filename = dirs.pop();
    index = filename.lastIndexOf('.');
    if (index === -1) {
      return filename;
    } else {
      return filename.substr(0, index);
    }
  };

  utils.parseArguments = function(args) {
    var e, error;
    try {
      return JSON.parse("[" + args + "]");
    } catch (error) {
      e = error;
      return void 0;
    }
  };

}).call(this);
