const db = require('../db')
const Sequelize = require('sequelize')

const Scene = db.define('scenes', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: false
    }
  }
})

module.exports = Scene

