const express = require('express')
const path = require('path')
const app = express()
const router = require('./router')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
const { db } = require('./db')
const PORT = 5000

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // compression middleware
  app.use(compression())

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  app.use('/', router)

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
}

const syncDb = () => db.sync()

//only syncDB if called from command line.
if (process.env.NODE_ENV !== 'test') {
  syncDb()
    .then(createApp)
    .then(startListening)
} else {
  createApp()
}

module.exports = app
