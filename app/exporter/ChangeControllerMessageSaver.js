// @ts-check
'use strict'

const ChangeControllerMessage = require('../../sequelize/models/ChangeControllerMessage')

/**
 * ChangeControllerMessageSaver.
 */
class ChangeControllerMessageSaver {
  /**
   * save ipn
   *
   * @param {Array<ChangeControllerMessageParam>} param
   * @param {import('sequelize').QueryOptions} options
   * @return {Promise<Array<ChangeControllerMessage>>}
   */
  async batchCreateChangeControllerMessages (
    param,
    options
  ) {
    return ChangeControllerMessage.bulkCreate(
      {
        ...param,
      },
      options
    )
  }
}

module.exports = ChangeControllerMessageSaver

/**
 * @typedef {{
 * transactionId: Number,
 * identifierId: Number,
 * newController: String,
 * }} ChangeControllerMessageParam
 */
