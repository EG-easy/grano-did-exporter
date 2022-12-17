// @ts-check
'use strict'

const SetAttributeMessage = require('../../sequelize/models/SetAttributeMessage')

/**
 * SetAttributeMessageSaver.
 */
class SetAttributeMessageSaver {
  /**
   * save ipn
   *
   * @param {Array<SetAttributeMessageParam>} param
   * @param {import('sequelize').QueryOptions} options
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
 * identifierId: Number,
 * name: String,
 * value: String,
 * validity: Number,
 * }} SetAttributeMessageParam
 */
