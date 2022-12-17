// @ts-check
'use strict'

const RevokeAttributeMessage = require('../../sequelize/models/RevokeAttributeMessage')

/**
 * RevokeAttributeMessageSaver.
 */
class RevokeAttributeMessageSaver {
  /**
   * save ipn
   *
   * @param {Array<RevokeAttributeMessageParam>} param
   * @param {import('sequelize').QueryOptions} options
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
 * identifierId: Number,
 * name: String,
 * value: String,
 * }} RevokeAttributeMessageParam
 */
