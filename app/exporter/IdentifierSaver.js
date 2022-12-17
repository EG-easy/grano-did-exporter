// @ts-check
'use strict'

const Identifier = require('../../sequelize/models/Identifier')

/**
 * IdentifierSaver.
 */
class IdentifierSaver {
  /**
   * save ipn
   *
   * @param {Array<IdentifierParam>} param
   * @param {import('sequelize').QueryOptions} options
   * @return {Promise<Array<Identifier>>}
   */
  async batchCreateIdentifiers (
    param,
    options
  ) {
    return Identifier.bulkCreate(
      {
        ...param,
      },
      options
    )
  }
}

module.exports = IdentifierSaver

/**
 * @typedef {{
 * identifier: String,
 * }} IdentifierParam
 */
