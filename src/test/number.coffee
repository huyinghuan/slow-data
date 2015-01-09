Base = require './base'

entity = new Base('number')

queue = [
  "$number()", "$number(5)", "$number(1,100)", "$number(2,9,3)",
  "$number(a)", "$number(a(6,8))"
]

entity.testAll(queue)