const db = require('../db')
const Sequelize = require('sequelize')

const Prompt = db.define('prompts', {
  text: {
    type: Sequelize.TEXT
  }
})

module.exports = Prompt

