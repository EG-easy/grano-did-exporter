// @ts-check
'use strict'

const BaseModel = require('./BaseModel')

/**
 * @extends BaseModel
 */
class SetAttributeMessage extends BaseModel {
  /**
   * createAttributes
   *
   * @param {import('sequelize').DataTypes} DataTypes
   * @returns {Object}
   */
  static createAttributes (DataTypes) {
    return {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      transactionId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      identifierId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      validity: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    }
  }

  /** @inheritdoc */
  static createOptions (sequelizeClient) {
    return {
      ...super.createOptions(sequelizeClient),
    }
  }

  /** @inheritdoc */
  static associate () {
    super.associate?.()
  }

  /** @inheritdoc */
  static defineScopes (Op) {
    super.defineScopes?.(Op)
  }
}

module.exports = SetAttributeMessage
