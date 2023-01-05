'use strict'

module.exports = {
  development: {
    database: 'development_database',
    username: null,
    password: null,

    dialect: 'sqlite',
    storage: 'sequelize/storage/development.sqlite3',
    logging: false,
  },
  production: {
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,

    dialect: process.env.DIALECT,
    host: process.env.HOST,
    port: process.env.PORT,
  },
}
