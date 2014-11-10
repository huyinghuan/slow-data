_http = require 'http'
_ = require 'lodash'
_fs = require 'fs'
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
      @options.templateAvailable =
        @options.templateAvailable.concat options.templateAvailable

    @templateAvailableType  = _.map @options.templateAvailable, (filePath)->
      return _path.join(filePath, 'type')

    @templateAvailableFactory = _.map @options.templateAvailable, (filePath)->
      return _path.join(filePath, 'factory')

    #获取可用数据生成函数集合
    @templateFunctionList =
      _schema.getTemplateFunctionList @options.templateEnable, @templateAvailableType

  #产生特殊表达式数据
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

  build: (schemaPlain, context = {})->
    schema = _schema.getSchema schemaPlain, @schemaDirectroy
    return schemaPlain if not _.isPlainObject schema

    bean = schema.module
    length = schema.length

    if length is undefined
      return @genObject(bean, _.extend(context, {index: 0}))

    queue = []
    for index in [0..length]
      queue.push @genObject(bean, _.extend(context, {index: index}))

    return queue




module.exports = SlowData