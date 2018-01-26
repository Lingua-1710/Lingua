
const Sequelize = require('sequelize')

console.log("Opening database connection")

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/lingua', {
    logging: false
  })

module.exports = db


