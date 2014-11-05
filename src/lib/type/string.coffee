_ = require 'lodash'
#string[1,2,true,false,true,false]
module.exports = (exp)->
  type = "string"
  orig = ["$string", "$string()"]
  return type: type if _.indexOf(orig, exp) isnt -1

  reg = /^\$string\((\d|true|false|\,|\ )*\)$/
  return undefined if not reg.test exp

  args = exp.replace(/\$string(\(.*\))/, "$1")
  try
   args = JSON.parse args
  catch error
    return undefined

  options = {}
  if args.length is 1
    max = args[0]
    return undefined  if not _.isNumber max
    options.min = options.max = max
    return type: type, options: options

  min = +args[0]
  max = +args[1]
  return undefined if _.isNaN(min) or _.isNaN(max)
  options.max = max
  options.min = min

  return type: type, options: options if args.length is 2

  options.special = !!args[2] if args[2]?
  options.number = !!args[3] if args[3]?
  options.upper = !!args[4] if args[4]?
  options.lower = !!args[5] if args[5]?

  return type:type, options: options