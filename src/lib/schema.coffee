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
getTemplateFunctionList = (templateEnable = {}, templateAvailable)->
  #方便测试
  if templateAvailable is undefined
    templateAvailable= [_path.join(__dirname, 'type')]

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

#获取 module路径和参数
getTemplateFunction = (expression, functions, templateAvailable)->
  #方便测试
  if templateAvailable is undefined
    templateAvailable = [_path.join(__dirname, 'factory') ]

  #获取数据处理函数名称和相关参数
  factory = undefined
  try
    for classify in functions
      factory = classify expression
      continue if factory is undefined
      break
  catch e
    console.warn "Can't resolve #{expression}"
    console.log e.stack
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

  return buildPath: buildPath, arguments: [factory.options]

getSchema = (schema, schemaDirectory)->
  return schema if _.isPlainObject schema
  return false if not _.isString schema
  try
    filePath = _path.join schemaDirectory, schema
    bean = require filePath
  catch e
    console.log e.stack
    return false
  return bean

schema.getSchema = getSchema
schema.getTemplateFunctionList = getTemplateFunctionList
schema.getTemplateFunction = getTemplateFunction