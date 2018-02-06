const db = require('../db')
const Sequelize = require('sequelize')

const Item = db.define('items', {
  name: {
    type: Sequelize.STRING
  },
  url: {
    type: Sequelize.STRING
  }
})

module.exports = Item

