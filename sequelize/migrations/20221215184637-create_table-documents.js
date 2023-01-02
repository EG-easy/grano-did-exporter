'use strict'

const TABLE_NAME = 'documents'
const COLUMN_NAME = {
  IDENTIFIER: 'identifier',
  VERSION: 'version',
  CONTENT: 'content',
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
      identifier: {
        type: Sequelize.STRING(191),
        field: COLUMN_NAME.IDENTIFIER,
        allowNull: false,
      },
      version: {
        type: Sequelize.BIGINT,
        field: COLUMN_NAME.VERSION,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        field: COLUMN_NAME.CONTENT,
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
        COLUMN_NAME.IDENTIFIER,
      ], {
        name: [
          TABLE_NAME,
          COLUMN_NAME.IDENTIFIER,
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
