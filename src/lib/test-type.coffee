_number = require './type/number'

testNumber = ->
  queue = ["$number", "$number[1]", "$number[2,3]", "$number[3,2,1]"]
  console.log _number index for index in queue

#testNumber()