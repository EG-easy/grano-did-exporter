// @ts-check
'use strict'

const BaseModel = require('./BaseModel')

/**
 * @extends BaseModel
 */
class ChangeControllerMessage extends BaseModel {
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
      newController: {
        type: DataTypes.STRING(191),
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

module.exports = ChangeControllerMessage
