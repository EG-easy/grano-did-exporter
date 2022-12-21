// @ts-check
'use strict'

const appendDatetimeFields = require('./../utils/appendDatetimeFields')

const TABLE_NAME = 'controllers'
const seeders = [
  { id: 1, identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev', version: 1, controller: 'grano1m2pz9nj72lj2yxnpcmxqwfwk50v35gq7wd399m' },
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
