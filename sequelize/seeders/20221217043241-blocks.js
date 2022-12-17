// @ts-check
'use strict'

const appendDatetimeFields = require('./../utils/appendDatetimeFields')

const TABLE_NAME = 'blocks'
const seeders = [
  { id: 1, height: 1, time: new Date('2022-12-17T12:00:00.001Z') },
  { id: 2, height: 2, time: new Date('2022-12-17T12:00:00.002Z') },
  { id: 3, height: 3, time: new Date('2022-12-17T12:00:00.003Z') },
  { id: 4, height: 4, time: new Date('2022-12-17T12:00:00.004Z') },
  { id: 5, height: 5, time: new Date('2022-12-17T12:00:00.005Z') },
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
