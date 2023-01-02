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
    database: 'production_database',
    username: 'admin-production',
    password: 'production-password',

    dialect: 'mysql',
    host: 'http://pruduction.sample.com',
    port: 3306,
  }
}
