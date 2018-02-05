const db = require('../db')
const Sequelize = require('sequelize')

const Character = db.define('characters', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: false
    }
  },
  objUrl: {
    type: Sequelize.STRING,
    defaultValue: 'models/octo/ramenocto.obj'
  },
  matUrl: {
    type: Sequelize.STRING,
    defaultValue: 'models/octo/ramenoctomaterials.mtl'
  },
  initialPromptId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Character
