const db = require('../db')
const Sequelize = require('sequelize')

const Language = db.define('languages', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: false
    }
  },
  code: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: false
    }
  },
  google: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: false
    }
  }
})

module.exports = Language

