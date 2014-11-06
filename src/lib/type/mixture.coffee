###
  混合对象 $mixture("$string", "$number", "$(ad,$c)")
  author: ec.huyinghuan@gmail.com
  date: 2014.11.05
###
_utils = require '../utils'

module.exports = (exp)->
  reg = /^\$mixture\((.*)\)$/
  return undefined if not reg.test exp
  type = _utils.getFileName __filename
  arrStr = exp.replace(reg, "$1")
  arr = JSON.parse "[#{arrStr}]"
  options =
    types: arr
  type: type, options: options