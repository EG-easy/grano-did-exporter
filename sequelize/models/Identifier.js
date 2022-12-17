// @ts-check
'use strict'

const BaseModel = require('./BaseModel')

const Document = require('./Document')
const Controller = require('./Controller')
const ChangeControllerMessage = require('./ChangeControllerMessage')
const SetAttributeMessage = require('./SetAttributeMessage')
const RevokeAttributeMessage = require('./RevokeAttributeMessage')

/**
 * @extends BaseModel
 */
class Identifier extends BaseModel {
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
      identifier: {
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
    this.hasMany(Document)
    this.hasMany(Controller)
    this.hasMany(ChangeControllerMessage)
    this.hasMany(SetAttributeMessage)
    this.hasMany(RevokeAttributeMessage)
  }

  /** @inheritdoc */
  static defineScopes (Op) {
    super.defineScopes?.(Op)
  }
}

module.exports = Identifier
