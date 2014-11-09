_http = require 'http'
_ = require 'lodash'
_sload = require 'sload'
_path = require 'path'
_schema = require './schema'
_utils = require './utils'
_special = require './special/index'
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

    @templateFunctionList = _schema.getTemplateFunctionList @options.templateEnable, @templateAvailableType

  genSpecialField: (exp, context)->
    try
      group = _special.getTemplateGroup exp
    catch e
      console.warn "Can't resolve mixture group"
      return exp

    queue = []
    queue.push @gen field, context for field in group
    return queue.join ''

  #简单数据类型生成。除object, array类型以外的任意数据生成。
  gen: (exp, context = {})->
    #是否为合成字段
    return @genSpecialField exp, context if _special.isSpecial exp

    #获取 数据生成module的路径和参数
    func = _schema.getTemplateFunction exp, @templateFunctionList, @templateAvailableFactory
    #是否存在该module
    return exp if not func.buildPath

    build = require func.buildPath
    try
      build.apply context, func.arguments
    catch e
      return exp


  #生成数据对象
  genObject: (bean, context = {})->
    return {} if not _.isPlainObject bean
    obj = {}
    for key, value of bean
      obj[key] = @gen value, context
    return obj

  build: (schema)->

module.exports = SlowData