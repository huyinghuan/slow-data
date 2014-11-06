_ = require 'lodash'
_sload = require 'sload'
_path = require 'path'
_utils = require './utils'

module.exports = utils = ->

#生成模拟数据
genField = (exp, modules)->
  #获取 exp 类型区分函数
  options =
    ignore: (exp)->
      type = _utils.getFileName exp
      not modules[type]

  classifyList = _sload.scan 'type', __dirname, options
  factory = undefined
  try
    for classify in classifyList
      factory = classify exp
      continue if factory is undefined
      break
  catch e
    factory = undefined

  if factory is undefined
    factory =
      type: "undefined"
      options: exp

  build = _sload factory.type, _path.join(__dirname, "factory")
  try
    build factory.options
  catch e
    return exp


#生成模拟数据对象
genObj = (schema, modules)->
  return {} if not _.isPlainObject schema
  obj = {}
  for key, value of schema
    obj[key] = genField value, modules
  return obj

utils.genField = genField
utils.genObj = genObj