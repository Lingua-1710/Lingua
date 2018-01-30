const db = require('../db')
const Sequelize = require('sequelize')

const Scene = db.define('scenes', {
  name: {
    type: Sequelize.STRING
  }
})

module.exports = Scene

