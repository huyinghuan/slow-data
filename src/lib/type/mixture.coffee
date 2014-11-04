###
  混合对象 $mixture["$string", "$number", "$(adc)"]
  author: ec.huyinghuan@gmail.com
  date: 2014.11.05
###
_utils = require '../utils'

module.exports = (exp)->
  type = _utils.getFileName __filename
  reg = /^\$mixtrue\[.*\]$/
  return undefined if not reg.test exp
  arrStr = exp.replace(/\$mixtrue\[/, "").replace(/\]$/, "")
  arr = JSON.parse arrStr