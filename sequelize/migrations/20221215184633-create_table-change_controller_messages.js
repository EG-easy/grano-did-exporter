'use strict'

const TABLE_NAME = 'change_controller_messages'
const COLUMN_NAME = {
  TRANSACTION_ID: 'transaction_id',
  IDENTIFIER_ID: 'identifier_id',
  NEW_CONTROLLER: 'new_controller',
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
        autoInclement: true,
        primaryKey: true,
      },
      transactionId: {
        type: Sequelize.BIGINT,
        field: COLUMN_NAME.TRANSACTION_ID,
        allowNull: false,
      },
      identifierId: {
        type: Sequelize.BIGINT,
        field: COLUMN_NAME.IDENTIFIER_ID,
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
        COLUMN_NAME.TRANSACTION_ID,
      ], {
        name: [
          TABLE_NAME,
          COLUMN_NAME.TRANSACTION_ID,
          'index',
        ].join('_'),
      }),
      queryInterface.addIndex(TABLE_NAME, [
        COLUMN_NAME.IDENTIFIER_ID,
      ], {
        name: [
          TABLE_NAME,
          COLUMN_NAME.IDENTIFIER_ID,
          'index',
        ].join('_'),
      }),
    ])
  },

  async down (
    queryInterface,
    Sequelize
  ) {
    return queryInterface.dropTable(TABLE_NAME)
  }
}
