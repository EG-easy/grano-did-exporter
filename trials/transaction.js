const db = require('../sequelize/models')
const Transaction = require('../sequelize/models/Transaction')

console.log('models >>>: ', db.sequelize.models)

Transaction.scope('+Message').findAll({
  raw: true,
  nest: true
})
  .then(results => console.log('result >>>', results))
