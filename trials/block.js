const db = require('../src/sequelize/models')
const Block = require('../src/sequelize/models/Block')

console.log('models >>>: ', db.sequelize.models)

Block.scope('+Transaction').findAll({
  where: { id: 2 },
  raw: true,
  nest: true
})
  .then(results => console.log('result >>>', results))
