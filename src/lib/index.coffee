_http = require 'http'
_utils = require './utils'

class SlowData
  constructor: ->
  #router配置 接收文件名string 或者json对象 和 schema文件夹
  init: (routerConfig, schemaDirectory)->
  #数据端口
  start: (port)->
  #简单数据类型生成。除object类型以外的任意数据生成。
  gen: (exp)->
    _utils.gen exp
module.exports = new SlowData()