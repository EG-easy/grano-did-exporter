'use strict'

const TABLE_NAME = 'blocks'
const COLUMN_NAME = {
  HEIGHT: 'height',
  TIME: 'time',
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
      height: {
        type: Sequelize.BIGINT,
        field: COLUMN_NAME.HEIGHT,
        allowNull: false,
      },
      time: {
        type: Sequelize.DATE(3),
        field: COLUMN_NAME.TIME,
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
  },

  async down (
    queryInterface,
    Sequelize
  ) {
    return queryInterface.dropTable(TABLE_NAME)
  }
}
