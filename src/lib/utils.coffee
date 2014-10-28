_ = require 'lodash'
_sload = require 'sload'
_path = require 'path'
module.exports = utils = ->

#生成模拟数据
gen = (exp)->
  #获取 exp 类型区分函数
  classifyList = _sload.scan 'type', __dirname
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
genObj = (schema)->
  return {} if not _.isPlainObject schema
  obj = {}
  for key, value of schema
    obj[key] = gen value
  return obj

utils.gen = gen
utils.genObj = genObj