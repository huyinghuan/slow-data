_string = require './factory/string'
_number = require './factory/number'
_common = require './factory/common'
genString = ()->
  options =
    special: true
    number: true
    upper: true
  console.log _string(options) for i in [0..10]

#genString()

genNumber = ()->
  options =
    min: 0
    max: 100
    fixed: 2
  console.log _number(options) for i in [0..10]

#genNumber()

genRegexp = ->
  test = [
    /([a-z]|[A-Z]){3,7}/ #字母
    /([a-z]|[A-Z]|[0-9]){4,8}/ #字母加数字
    /([A-z0-9]){5}/ #字母加数字加特殊符号，可用于密码生成
  ]
  console.log _common index for index in test

genRegexp()