_utils = require '../utils'
testNumber = ->
  queue = [
    "$number()", "$number[5]", "$number[1,100]", "$number[2,9,3]",
    "$number[a]", "$number[a(6,8)]"
  ]

  console.log _utils.gen exp for exp in queue

#testNumber()
testString = ->
  queue = [
    "$string", "$string[]", "$string()", "$string[1]",
    "$string[2,3]",
    "$string[3, 12, 1]", "$string[3,12,1,1,0,0]",
    "$string[3, 22, 1, true, false]"
  ]
  console.log _utils.gen exp for exp in queue

#testString()
testObj = ()->
  schema =
    name: "$string[5]"
    age: "$number[1, 150]"
    email: /\w{8}@\w{2,5}\.\w{2,4}/
    birth: "$date"
  console.log _utils.genObj schema

testObj()