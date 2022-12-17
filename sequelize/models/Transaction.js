// @ts-check
'use strict'

const BaseModel = require('./BaseModel')

const ChangeControllerMessage = require('./ChangeControllerMessage')
const SetAttributeMessage = require('./SetAttributeMessage')
const RevokeAttributeMessage = require('./RevokeAttributeMessage')

/**
 * @extends BaseModel
 */
class Transaction extends BaseModel {
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
      blockId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      hash: {
        type: DataTypes.STRING(191),
        allowNull: false,
      },
      rawLog: {
        type: DataTypes.TEXT,
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
    this.hasMany(ChangeControllerMessage)
    this.hasMany(SetAttributeMessage)
    this.hasMany(RevokeAttributeMessage)
  }

  /** @inheritdoc */
  static defineScopes (Op) {
    super.defineScopes?.(Op)

    this.addScope('+Message', () => {
      return {
        include: [
          ChangeControllerMessage,
          SetAttributeMessage,
          RevokeAttributeMessage,
        ]
      }
    })
  }
}

module.exports = Transaction
