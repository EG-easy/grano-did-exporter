// @ts-check
'use strict'

const { logs } = require('@cosmjs/stargate')
const logger = require('pino')()

/**
 * RevokeAttributeMessagesExtractor.
 */
class RevokeAttributeMessagesExtractor {
  /**
   * constructor.
   *
   * @param {RevokeAttributeMessagesExtractorParams} params - exporter params
   */
  constructor ({
    transactions,
  } = {}) {
    this.transactions = transactions
  }

  /**
   * create.
   *
   * @param {RevokeAttributeMessagesExtractorParams} params - exporter params
   * @returns {RevokeAttributeMessagesExtractor}
   */
  static create (params = {}) {
    return new this(params)
  }

  /**
   * extractRevokeAttributeMessages.
   *
   * @returns {Array<import('./RevokeAttributeMessageSaver').RevokeAttributeMessageParam>}
   */
  extractRevokeAttributeMessages () {
    const targetTransactions = this._findTargetTransactions()

    return targetTransactions.map( transaction => {
      const log = logs.parseRawLog(transaction.rawLog)
      const identifierObject = logs.findAttribute(log, 'wasm', 'identifier')
      const nameObject = logs.findAttribute(log, 'wasm', 'name')
      const valueObject = logs.findAttribute(log, 'wasm', 'value')

      return {
        transactionId: transaction.id,
        identifier: identifierObject.value,
        name: nameObject.value,
        value: valueObject.value,
      }
    })
  }

  /**
   * findTargetTransactions.
   *
   * @returns {Array<import('../../sequelize/models/Transaction')>} transactions
   */
  _findTargetTransactions () {
    return this.transactions.filter( transaction => {
      try {
        const log = logs.parseRawLog(transaction.rawLog)
        logs.findAttribute(log, 'wasm', 'identifier')
        logs.findAttribute(log, 'wasm', 'name')
        logs.findAttribute(log, 'wasm', 'value')

        return transaction
      } catch (error) {
        logger.info(`parse error: ${error}`)
      }
    })
  }
}

module.exports = RevokeAttributeMessagesExtractor

/**
 * @typedef {{
 * transactions?: Array<import('../../sequelize/models/Transaction')>
 * }} RevokeAttributeMessagesExtractorParams
 */
