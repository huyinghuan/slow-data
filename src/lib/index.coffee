_http = require 'http'
_ = require 'lodash'
_sload = require 'sload'
_path = require 'path'
_schema = require './schema'
_utils = require './utils'

class SlowData
  constructor: (schemaDirectory, options)->
    @schemaDirectroy = false
    @options =
      templateEnable: require './modules' #启用了哪些数据生成模块
      templateAvailable: [__dirname] #拥有哪些数据模块
    @init(schemaDirectory, options)

  #schema文件夹
  init: (schemaDirectory, options = {})->
    @schemaDirectroy = schemaDirectory if schemaDirectory
    @setOptions options

  #配置
  setOptions: (options)->
    if options.templateEnable
      _.extend @options.templateEnable, options.templateEnable
    if options.templateAvailable
      @options.templateAvailable = @options.templateAvailable.concat options.templateAvailable

    @templateAvailableType  = _.map @options.templateAvailable, (filePath)->
      return _path.join(filePath, 'type')

    @templateAvailableFactory = _.map @options.templateAvailable, (filePath)->
      return _path.join(filePath, 'factory')

    @templateFunctionList = _schema.getTemplateFunctions @options.templateEnable, @templateAvailableType

  #简单数据类型生成。除object, array类型以外的任意数据生成。
  gen: (exp)->
    _schema.genField exp, @templateFunctionList, @templateAvailableFactory

  #生成数据对象
  genObject: (bean)->
   _schema.genObj bean, @templateFunctionList, @templateAvailableFactory

  build: (schema)->

module.exports = SlowData