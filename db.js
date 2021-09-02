const { Sequelize } = require('sequelize')

module.exports = new Sequelize (
  'bekush',
  'bekush',
  'nehcbyjq',
  {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres'
  }
)