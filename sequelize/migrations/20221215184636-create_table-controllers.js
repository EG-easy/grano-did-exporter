'use strict'

const TABLE_NAME = 'controllers'
const COLUMN_NAME = {
  IDENTIFIER_ID: 'identifier_id',
  VERSION: 'version',
  CONTROLLER: 'controller',
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
      identifierId: {
        type: Sequelize.BIGINT,
        field: COLUMN_NAME.IDENTIFIER_ID,
        allowNull: false,
      },
      version: {
        type: Sequelize.BIGINT,
        field: COLUMN_NAME.VERSION,
        allowNull: false,
      },
      controller: {
        type: Sequelize.STRING(191),
        field: COLUMN_NAME.CONTROLLER,
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
        COLUMN_NAME.IDENTIFIER_ID,
      ], {
        name: [
          TABLE_NAME,
          COLUMN_NAME.IDENTIFIER_ID,
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
