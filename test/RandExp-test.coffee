_RandExp = require 'randexp'

test = [
  /([a-z]|[A-Z]){3,7}/ #字母
  /([a-z]|[A-Z]|[0-9]){4,8}/ #字母加数字
  /([A-z0-9]){5}/ #字母加数字加特殊符号，可用于密码生成
]


console.log new _RandExp(/([A-z]){5}/).gen() for i in [0..10]
