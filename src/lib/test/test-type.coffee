_number = require './../type/number'
_string = require './../type/string'
_generic = require './../type/generic'
_regexp = require './../type/regexp'
_mixture = require './../type/mixture'

testNumber = ->
  queue = ["$number", "$number(1)", "$number(2,3)", "$number(3,2,1)"]
  console.log _number index for index in queue

#testNumber()

testString = ->
  queue = ["$string", "$string()", "$string(1)",
           "$string(2,3)", "$string(3, 12, 1)", "$string(3,12,1,1,0,0)",
          "$string(3, 22, 1, true, false)"
  ]
  console.log _string index for index in queue

#testString()

testGeneric = ->
  queue = ["$(123)", '$(sta)']
  console.log _generic index for index in queue

#testGeneric()

testRegexp = ->
  queue = ["$regexp([a-z])", '$regexp(\\s)']
  console.log _regexp index for index in queue

#testRegexp()

testMixture = ->
  queue = ['$$("$string()", "$number()")']
  console.log _mixture index for index in queue

#testMixture()