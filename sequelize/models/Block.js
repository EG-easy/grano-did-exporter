// @ts-check
'use strict'

const BaseModel = require('./BaseModel')
const Transaction = require('./Transaction')

/**
 * @extends BaseModel
 */
class Block extends BaseModel {
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
      height: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      time: {
        type: DataTypes.DATE,
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
    this.hasMany(Transaction)
  }

  /** @inheritdoc */
  static defineScopes (Op) {
    super.defineScopes?.(Op)

    this.addScope('+Transaction', () => {
      return {
        include: Transaction
      }
    })
  }
}

module.exports = Block
