const db = require('../db')
const Sequelize = require('sequelize')

const Response = db.define('responses', {
  text: {
    type: Sequelize.TEXT
  },
  isCorrect: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Response
