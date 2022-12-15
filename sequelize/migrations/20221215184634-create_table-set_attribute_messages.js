'use strict'

const TABLE_NAME = 'set_attribute_messages'
const COLUMN_NAME = {
  TRANSACTION_ID: 'transaction_id',
  IDENTIFIER_ID: 'identifier_id',
  NAME: 'name',
  VALUE: 'value',
  VALIDITY: 'validity',
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
      name: {
        type: Sequelize.TEXT,
        field: COLUMN_NAME.NAME,
        allowNull: false,
      },
      value: {
        type: Sequelize.TEXT,
        field: COLUMN_NAME.VALUE,
        allowNull: false,
      },
      validity: {
        type: Sequelize.BIGINT,
        field: COLUMN_NAME.VALIDITY,
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
