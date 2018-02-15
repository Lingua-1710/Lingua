const db = require('../db')
const Sequelize = require('sequelize')

const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: false
    }
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notEmpty: false
    }
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: false
    }
  }
})

module.exports = User

