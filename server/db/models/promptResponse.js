const Sequelize = require('sequelize')
const db = require('../db')

const PromptResponse = db.define('prompt_responses', {
  nextPromptId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = PromptResponse
