// @ts-check
'use strict'

const SetAttributeMessage = require('../../sequelize/models/SetAttributeMessage')

/**
 * SetAttributeMessageSaver.
 */
class SetAttributeMessageSaver {
  /**
   * batchCreateSetAttributeMessages
   *
   * @param {Array<SetAttributeMessageParam>} param
   * @param {import('sequelize').BulkCreateOptions} options
   * @return {Promise<Array<SetAttributeMessage>>}
   */
  async batchCreateSetAttributeMessages (
    param,
    options
  ) {
    return SetAttributeMessage.bulkCreate(
      {
        ...param,
      },
      options
    )
  }
}

module.exports = SetAttributeMessageSaver

/**
 * @typedef {{
 * transactionId: Number,
 * identifier: String,
 * name: String,
 * value: String,
 * validity: Number,
 * }} SetAttributeMessageParam
 */
