// @ts-check
'use strict'

const ChangeControllerMessage = require('../../sequelize/models/ChangeControllerMessage')

/**
 * ChangeControllerMessageSaver.
 */
class ChangeControllerMessageSaver {
  /**
   * batchCreateChangeControllerMessages
   *
   * @param {Array<ChangeControllerMessageParam>} param
   * @param {import('sequelize').BulkCreateOptions} options
   * @return {Promise<Array<ChangeControllerMessage>>}
   */
  async batchCreateChangeControllerMessages (
    param,
    options
  ) {
    return ChangeControllerMessage.bulkCreate(
      param,
      options
    )
  }
}

module.exports = ChangeControllerMessageSaver

/**
 * @typedef {{
 * transactionId: Number,
 * identifier: String,
 * newController: String,
 * }} ChangeControllerMessageParam
 */
