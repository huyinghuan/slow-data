_ = require 'lodash'
_sload = require 'sload'
_path = require 'path'
module.exports = utils = ->

#生成模拟数据
utils.gen = (exp)->
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

  gen = _sload factory.type, _path.join(__dirname, "factory")
  try
    gen(factory.options)
  catch e
    return exp

#生成模拟数据对象
utils.genObj = (schema)->
