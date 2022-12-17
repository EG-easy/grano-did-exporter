// @ts-check
'use strict'

const Sequelize = require('sequelize')

const models = [
  require('./Block'),
  require('./Transaction'),
  require('./Identifier'),
  require('./ChangeControllerMessage'),
  require('./SetAttributeMessage'),
  require('./RevokeAttributeMessage'),
  require('./Document'),
  require('./Controller'),
]

const env = process.env.NODE_ENV || 'development'
const config = require('../config')[env]

const sequelize = new Sequelize(config.database, config.username, config.password, config)

models.map(model => {
  model.initWithSequelizeClient(sequelize)

  return model
})

models.map(model => model.postInit())

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
