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
  promptResponsesId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  scopes: {
    populated: () => ({
      include: {
        all: true
      }
    })
  }
})

module.exports = Quest
