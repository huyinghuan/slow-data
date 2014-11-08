
/*
  工具类集合
  author: ec.huyinghuan@gmail.com
  date: 2014.11.04
 */

(function() {
  var utils, _path;

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

}).call(this);
