_ = require 'lodash'
#$number(1,10,0)

vertify = (options)->
  for key, value of options
    if (not _.isNumber(value)) or parseInt(value) isnt value
      return false
  return true

module.exports = (exp)->
  type = "number"
  orig = ["$number", "$number()"]
  return type: type if _.indexOf(orig, exp) isnt -1

  reg = /^\$number\([\d\,\ ]*\)$/
  return undefined if not reg.test exp

  args = exp.match /\d+/g

  if args.length is 0
    return type: type

  if args.length is 1
    args[1] = +args[0] #最大值
    args[0] = 0 #最小值
    args[2] = 0 #保留小数位数

  if args.length is 2
    args[2] = 0

  result =
    type: type
    options:
      min: +args[0]
      max: +args[1]
      fixed: +args[2]
  if not vertify(result.options)
    throw new Error("invalid arguments")

  return result