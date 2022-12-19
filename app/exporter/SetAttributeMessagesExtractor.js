// @ts-check
'use strict'

const { logs } = require('@cosmjs/stargate')
const logger = require('pino')()

/**
 * SetAttributeMessagesExtractor.
 */
class SetAttributeMessagesExtractor {
  /**
   * constructor.
   *
   * @param {SetAttributeMessagesExtractorParams} params - exporter params
   */
  constructor ({
    transactions,
  } = {}) {
    this.transactions = transactions
  }

  /**
   * create.
   *
   * @param {SetAttributeMessagesExtractorParams} params - exporter params
   * @returns {SetAttributeMessagesExtractor}
   */
  static create (params = {}) {
    return new this(params)
  }

  /**
   * extractSetAttributeMessages.
   *
   * @returns {Array<import('./SetAttributeMessageSaver').SetAttributeMessageParam>}
   */
  extractSetAttributeMessages () {
    const targetTransactions = this._findTargetTransactions()

    return targetTransactions.map( transaction => {
      const log = logs.parseRawLog(transaction.rawLog)
      const identifierObject = logs.findAttribute(log, 'wasm', 'identifier')
      const nameObject = logs.findAttribute(log, 'wasm', 'name')
      const valueObject = logs.findAttribute(log, 'wasm', 'value')
      const validToObject = logs.findAttribute(log, 'wasm', 'validTo')

      return {
        transactionId: transaction.id,
        identifier: identifierObject.value,
        name: nameObject.value,
        value: valueObject.value,
        validity: Number(validToObject.value),
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
        logs.findAttribute(log, 'wasm', 'validTo')

        return transaction
      } catch (error) {
        logger.info(`parse error: ${error}`)
      }
    })
  }
}

module.exports = SetAttributeMessagesExtractor

/**
 * @typedef {{
 * transactions?: Array<import('../../sequelize/models/Transaction')>
 * }} SetAttributeMessagesExtractorParams
 */

