// @ts-check
'use strict'

const RevokeAttributeMessage = require('../../sequelize/models/RevokeAttributeMessage')

/**
 * RevokeAttributeMessageSaver.
 */
class RevokeAttributeMessageSaver {
  /**
   * batchCreateRevokeAttributeMessages
   *
   * @param {Array<RevokeAttributeMessageParam>} param
   * @param {import('sequelize').BulkCreateOptions} options
   * @return {Promise<Array<RevokeAttributeMessage>>}
   */
  async batchCreateRevokeAttributeMessages (
    param,
    options
  ) {
    return RevokeAttributeMessage.bulkCreate(
      {
        ...param,
      },
      options
    )
  }
}

module.exports = RevokeAttributeMessageSaver

/**
 * @typedef {{
 * transactionId: Number,
 * identifier: String,
 * name: String,
 * value: String,
 * }} RevokeAttributeMessageParam
 */
