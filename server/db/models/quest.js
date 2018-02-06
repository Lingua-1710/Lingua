const db = require('../db')
const Sequelize = require('sequelize')

const Quest = db.define('quests', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: false
    }
  },
  text: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: false
    }
  },
  prompt_responsesId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Quest
