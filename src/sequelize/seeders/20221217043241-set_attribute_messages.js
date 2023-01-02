// @ts-check
'use strict'

const appendDatetimeFields = require('./../utils/appendDatetimeFields')

const TABLE_NAME = 'set_attribute_messages'
const seeders = [
  { id: 1, transaction_id: 1, identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev', name: 'service', value: 'github', validity: 1671253822 },
  { id: 2, transaction_id: 2, identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev', name: 'service', value: 'twitter', validity: 1671253827 },
]

/**
 * @module
 * @type {{
 *   up: (
 *     queryInterface: import('sequelize').QueryInterface,
 *     Sequelize: typeof import('sequelize')
 *   ) => Promise<void>,
 *   down: (
 *     queryInterface: import('sequelize').QueryInterface,
 *     Sequelize: typeof import('sequelize')
 *   ) => Promise<void>,
 * }}
 */
module.exports = {
  async up (
    queryInterface,
    Sequelize
  ) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      appendDatetimeFields(seeders)
    )
  },

  async down (
    queryInterface,
    Sequelize
  ) {
    await queryInterface.bulkDelete(TABLE_NAME, {
      id: seeders.map(it => it.id)
    })
  }
}
