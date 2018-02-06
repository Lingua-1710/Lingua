const db = require('../db')
const Sequelize = require('sequelize')

const Language = db.define('languages', {
  name: {
    type: Sequelize.STRING
  },
  code: {
    type: Sequelize.STRING
  },
  google: {
    type: Sequelize.STRING
  }
})

module.exports = Language

