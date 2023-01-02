// @ts-check
'use strict'

const { default: Sequelize, DataTypes } = require('sequelize')

/**
 * GlidCoreModel
 *
 * @extends {Sequelize.Model} Sequelize.Model
 */
class BaseModel extends Sequelize.Model {
  /**
   * initWithSequelizeClient.
   *
   * @param {Sequelize} sequelizeClient
   * @returns {Object}
   */
  static initWithSequelizeClient (sequelizeClient) {
    return this.init(
      this.createAttributes(DataTypes),
      this.createOptions(sequelizeClient)
    )
  }

  /**
   * createAttributes.
   *
   * @param {import('sequelize').DataTypes} DataTypes
   * @returns {Object}
   * @throws
   */
  static createAttributes (DataTypes) {
    throw Error('not defined createAttributes')
  }

  /**
   * createOptions.
   *
   * @param {Sequelize} sequelizeClient
   * @returns {Object}
   */
  static createOptions (sequelizeClient) {
    return {
      modelName: this.name,
      sequelize: sequelizeClient,
      syncOnAssociation: false,
      timestamps: true,
      underscored: true,
    }
  }

  /**
   * Post initialize.
   *   - build up associate.
   *   - define scopes.
   *
   * @returns {typeof BaseModel} - Type of Sequelize Model.
   */
  static postInit () {
    this.associate()

    this.defineScopes(Sequelize.Op)

    return this
  }

  /**
   * Build up associations.
   */
  static associate () {
    // noop
  }

  /**
   * Build up Scopes.
   *
   * @param {Sequelize.Op} Op - Operator hash of Sequelize.
   */
  static defineScopes (Op) {
    // noop
  }
}

module.exports = BaseModel
