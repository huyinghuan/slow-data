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

getTemplateFunctions = (templateEnable, templateAvailable)->
  #获取 exp 类型区分函数
  options =
    ignore: (filename)->
      type = _utils.getFileName filename
      templateEnable[type] is false

  #扫描模板函数
  functions = []
  for availablePath in templateAvailable
    functions = functions.concat _sload.scan availablePath, options

  return functions

#获取模板函数列表
genField = (expression, functions, templateAvailable)->
  #获取数据处理函数名称和相关参数
  factory = undefined
  try
    for classify in functions
      factory = classify expression
      continue if factory is undefined
      break
  catch e
    console.warn "Can't resolve #{expression}"
    factory = undefined

  if factory is undefined
    factory =
      type: "undefined"
      options: expression

  #加载数据处理函数
  buildPath = undefined
  for factoryPath in templateAvailable
    tmpPath =  _path.join factoryPath, factory.type
    if _fs.existsSync("#{tmpPath}.js") or _fs.existsSync("#{tmpPath}.coffee")
      buildPath = tmpPath
      break

  return expression if not buildPath
  build = require buildPath
  try
    build factory.options
  catch e
    return expression

#生成模拟数据对象
genObj = (schema, functions, availableTemplates)->
  return {} if not _.isPlainObject schema
  obj = {}
  for key, value of schema
    obj[key] = genField value, functions, availableTemplates
  return obj

schema.getTemplateFunctions = getTemplateFunctions
schema.genField = genField
schema.genObj = genObj