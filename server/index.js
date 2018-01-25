const express = require('express')
const path = require('path')
const app = express()
const router = require('./router')

app.use(express.static(path.join(__dirname,'..','public')))

app.use('/', router)

app.listen(5000, () => {
  console.log(`listening on port 5000!`)
})

module.exports = app
