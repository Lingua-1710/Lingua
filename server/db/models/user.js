const db = require('../db')
const Sequelize = require('sequelize')

const User = db.define('users', {
  name: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
})

module.exports = User

