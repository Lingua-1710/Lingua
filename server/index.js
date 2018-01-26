const express = require('express')
const path = require('path')
const app = express()
const router = require('./router')
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname,'..','public')))

app.use('/', router)

app.listen(PORT, () => {
  console.log(`listening on port 5000!`)
})

module.exports = app
