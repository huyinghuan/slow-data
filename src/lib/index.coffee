_http = require 'http'
_ = require 'lodash'
_sload = require 'sload'

_schema = require './schema'
_utils = require './utils'

class SlowData
  constructor: ->
    @schemaDirectroy = false
    @options =
      templateEnable: require './modules' #启用了哪些数据生成模块
      templateAvailable: [__dirname] #拥有哪些数据模块
    @modules = []
    @refreshConfigure()

  #schema文件夹
  init: (schemaDirectory, options = {})->
    @schemaDirectroy = schemaDirectory if schemaDirectory
    @setOptions options

  #配置
  setOptions: (options)->
    _.extend @options.templateEnable, options.templateEnable if options.templateEnable
    @options.templateAvailable.concat options.templateAvailable if options.templateAvailable
    @refreshConfigure()

  #刷新配置
  refreshConfigure: ->
    @modulesList = _schema.getTemplateFunctions @options.templateEnable, @options.templateAvailable


  #简单数据类型生成。除object, array类型以外的任意数据生成。
  gen: (exp)->

    _schema.genField exp, @modulesList


  #生成数据对象
  genObject: (bean)->
    _schema.genObj bean, @modulesList
  build: (schema)->

module.exports = new SlowData()