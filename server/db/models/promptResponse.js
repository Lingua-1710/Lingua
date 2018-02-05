const Sequelize = require('sequelize')
const db = require('../db')

const PromptResponse = db.define('prompt_responses', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nextPromptId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = PromptResponse
