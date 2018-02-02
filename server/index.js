const express = require('express')
const path = require('path')
const app = express()
const router = require('./router')
const { db } = require('./db')
const PORT = 5000

app.use(express.static(path.join(__dirname,'..','public')))
app.use('/', router)

if (process.env.NODE_ENV !== 'test') {
  db.sync()
    .then(() => {
      console.log('db synced')
      app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))
    })
}

module.exports = app
