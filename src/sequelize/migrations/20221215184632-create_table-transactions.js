'use strict'

const TABLE_NAME = 'transactions'
const COLUMN_NAME = {
  BLOCK_ID: 'block_id',
  HASH: 'hash',
  RAW_LOG: 'raw_log',
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (
    queryInterface,
    Sequelize
  ) {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        field: 'id',
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      blockId: {
        type: Sequelize.BIGINT,
        field: COLUMN_NAME.BLOCK_ID,
        allowNull: false,
      },
      hash: {
        type: Sequelize.STRING(191),
        field: COLUMN_NAME.HASH,
        allowNull: false,
      },
      rawLog: {
        type: Sequelize.TEXT,
        field: COLUMN_NAME.RAW_LOG,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE(3),
        field: 'created_at',
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE(3),
        field: 'updated_at',
        allowNull: false,
      },
    })

    await Promise.all([
      queryInterface.addIndex(TABLE_NAME, [
        COLUMN_NAME.BLOCK_ID,
      ], {
        name: [
          TABLE_NAME,
          COLUMN_NAME.BLOCK_ID,
          'index',
        ].join('_'),
      })
    ])
  },

  async down (
    queryInterface,
    Sequelize
  ) {
    return queryInterface.dropTable(TABLE_NAME)
  }
}
