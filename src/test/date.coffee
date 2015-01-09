Base = require './base'

entity = new Base('date')

queue = ["$date", "$date()", '$date("2014", "", "yyyy")']

entity.testAll(queue)