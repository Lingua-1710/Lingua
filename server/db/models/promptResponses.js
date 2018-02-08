const Sequelize = require('sequelize')
const db = require('../db')

const PromptResponses = db.define('prompt_responses', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nextPromptId: {
    type: Sequelize.INTEGER
  }
})

module.exports = PromptResponses
