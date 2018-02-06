
const Sequelize = require('sequelize')
const db = require('../db')

const UserQuests = db.define('user_quests', {
  isCompleted: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = UserQuests
