const Sequelize = require('sequelize')
const db = require('../db')

const CharacterPrompt = db.define('character_prompts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

module.exports = CharacterPrompt
