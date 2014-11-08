###
  修改字段生成相关条件
  author: ec.huyinghuan@gmail.com
  date: 14-11.08
###

_ = require 'lodash'
_sload = require 'sload'
_path = require 'path'
_fs = require 'fs'
_utils = require './utils'

module.exports = schema = ->

#获取模板函数列表
genField = (expression, templateEnable, templateAvailable)->
  #获取 exp 类型区分函数
  options =
    ignore: (exp)->
      type = _utils.getFileName exp
      not templateEnable[type]

  #扫描模板函数
  functions = []
  for availablePath in templateAvailable
    functions = functions.concat _sload.scan 'type', availablePath, options

  #获取数据处理函数名称和相关参数
  factory = undefined
  try
    for classify in functions
      factory = classify expression
      continue if factory is undefined
      break
  catch e
    factory = undefined

  if factory is undefined
    factory =
      type: "undefined"
      options: expression

  #加载数据处理函数
  buildPath = undefined
  for factoryPath in templateAvailable
    tmpPath =  _path.join factoryPath, 'factory', factory.type
    if fs.existsSync "#{tmpPath}.js"
      buildPath = tmpPath
      break

  return expression if not buildPath
  build = require buildPath
  try
    build factory.options
  catch e
    return expression

#生成模拟数据对象
genObj = (schema, modules)->
  return {} if not _.isPlainObject schema
  obj = {}
  for key, value of schema
    obj[key] = genField value, modules
  return obj

schema.genField = genField
schema.genObj = genObj