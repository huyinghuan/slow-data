
###
  工具类集合
  author: ec.huyinghuan@gmail.com
  date: 2014.11.04
###
_path = require 'path'

module.exports = utils = {}

utils.getFileName = (fileName)->
  dirs = fileName.split _path.sep
  filename = dirs.pop()
  filename.substr(0, filename.lastIndexOf('.'))
