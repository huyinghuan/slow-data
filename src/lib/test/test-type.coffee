_number = require './../type/number'
_string = require './../type/string'

testNumber = ->
  queue = ["$number", "$number[1]", "$number[2,3]", "$number[3,2,1]"]
  console.log _number index for index in queue

#testNumber()

testString = ->
  queue = ["$string", "$string[]", "$string()", "$string[1]",
           "$string[2,3]", "$string[3, 12, 1]", "$string[3,12,1,1,0,0]",
          "$string[3, 22, 1, true, false]"
  ]
  console.log _string index for index in queue

testString()