_ = require 'lodash'
#$number(1,10,0)
module.exports = (exp)->
  reg = /(^\$number$)|(^\$number\[[^\[\]]*\]$)/
  return undefined if not reg.test exp
  type = "number"
  orig = ["$number", "$number[]", "$number()"]

  return type: type if _.indexOf(orig, exp) isnt -1

  args = exp.match /\d+/g

  if args.length is 0
    return type: type

  if args.length is 1
    args[1] = args[0] #最大值
    args[0] = 0 #最小值
    args[2] = 0 #保留小数位数

  if args.length is 2
    args[2] = 0

  result =
    type: type
    options:
      min: args[0]
      max: args[1]
      fixed: args[2]

  return result