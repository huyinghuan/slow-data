_http = require 'http'
_ = require 'lodash'
_schema = require './schema'
class SlowData
  constructor: ->
    @modules = require './modules'
    console.log @modules

  #router配置 接收文件名string 或者json对象 和 schema文件夹
  init: (schemaDirectory, configure = {})->
    @modules = _.extend {}, @modules, configure
  #简单数据类型生成。除object, array类型以外的任意数据生成。
  gen: (exp)->
    _schema.genField exp, @modules
  #生成数据对象
  genObject: (bean)->
    _schema.genObj bean, @modules
  build: (schema)->

module.exports = new SlowData()