const db = require('../sequelize/models')
const Identifier = require('../sequelize/models/Identifier')

console.log('models >>>: ', db.sequelize.models)

Identifier.scope('+Document+Controller').findAll({
  raw: true,
  nest: true
})
  .then(results => console.log('result >>>', results))
