Base = require './base'

entity = new Base('string')

queue = ["$string", "$string()", "$string(1)",
         "$string(2,3)", "$string(3, 12, 1)", "$string(3,12,1,1,0,0)",
         "$string(3, 22, 1, true, false)"
]

entity.testAll(queue)