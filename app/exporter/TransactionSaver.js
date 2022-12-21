// @ts-check
'use strict'

const Transaction = require('../../sequelize/models/Transaction')

/**
 * TransactionSaver.
 */
class TransactionSaver {
  /**
   * save ipn
   *
   * @param {Array<TransactionParam>} param
   * @param {import('sequelize').BulkCreateOptions} options
   * @return {Promise<Array<Transaction>>}
   */
  async batchCreateTransactions (
    param,
    options
  ) {
    return Transaction.bulkCreate(
      param,
      options
    )
  }
}

module.exports = TransactionSaver

/**
 * @typedef {{
 * blockId: Number,
 * hash: String,
 * rawLog: String,
 * }} TransactionParam
 */
