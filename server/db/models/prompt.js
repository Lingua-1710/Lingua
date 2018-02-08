const db = require('../db')
const Sequelize = require('sequelize')

const Prompt = db.define('prompts', {
  text: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: false
    }
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

module.exports = Prompt

