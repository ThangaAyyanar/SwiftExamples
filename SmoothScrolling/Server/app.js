var express = require('express')
var fs = require('fs')
var _ = require('lodash')
var app = express()

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.get('/users', function(request, response) {
  fs.readFile('users.json', 'utf8', function (error, data) {
    if (error) {
      throw error
    }
    var parsed = JSON.parse(data)

    let id = request.query.id || 0
    let count = request.query.count || parsed.length
    let slice = parsed.slice(id, count)
    var users = _.map(slice, function(user) { return JSON.parse(user) })
    response.json(users)
  })
})

module.exports = app;
