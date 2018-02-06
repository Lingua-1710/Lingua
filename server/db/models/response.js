const db = require('../db')
const Sequelize = require('sequelize')

const Response = db.define('responses', {
  text: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: false
    }
  }
})

module.exports = Response
