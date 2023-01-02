const db = require('../src/sequelize/models')
const Transaction = require('../src/sequelize/models/Transaction')

console.log('models >>>: ', db.sequelize.models)

Transaction.scope('+Message').findAll({
  raw: true,
  nest: true
})
  .then(results => console.log('result >>>', results))
