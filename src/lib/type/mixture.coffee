###
  混合对象 $mixture["$string", "$number", "$(adc)"]
  author: ec.huyinghuan@gmail.com
  date: 2014.11.05
###
_utils = require '../utils'

module.exports = (exp)->
  reg = /^\$mixtrue(\[.*\])$/
  return undefined if not reg.test exp
  type = _utils.getFileName __filename
  arrStr = exp.replace(/\$mixtrue/, "")
  arr = JSON.parse arrStr