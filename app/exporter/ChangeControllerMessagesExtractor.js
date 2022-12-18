// @ts-check
'use strict'

const { logs } = require('@cosmjs/stargate')

/**
 * ChangeControllerMessagesExtractor.
 */
class ChangeControllerMessagesExtractor {
  /**
   * constructor.
   *
   * @param {ChangeControllerMessagesExtractorParams} params - exporter params
   */
  constructor ({
    transactions,
  } = {}) {
    this.transactions = transactions
  }

  /**
   * create.
   *
   * @param {ChangeControllerMessagesExtractorParams} params - exporter params
   * @returns {ChangeControllerMessagesExtractor}
   */
  static create (params = {}) {
    return new this(params)
  }

  /**
   * extractChangeControllerMessages.
   *
   * @returns {Array<import('./ChangeControllerMessageSaver').ChangeControllerMessageParam>}
   */
  extractChangeControllerMessages () {
    const targetTransactions = this._findTargetTransactions()

    return targetTransactions.map( transaction => {
      const log = logs.parseRawLog(transaction.rawLog)
      const identifierObject = logs.findAttribute(log, 'wasm', 'identifier')
      const newControllerObject = logs.findAttribute(log, 'wasm', 'controller')

      return {
        transactionId: transaction.id,
        identifier: identifierObject.value,
        newController: newControllerObject.value,
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
        logs.findAttribute(log, 'wasm', 'controller')

        return transaction
      } catch (error) {
        console.log('parse err: ', error)
      }
    })
  }
}

module.exports = ChangeControllerMessagesExtractor

/**
 * @typedef {{
 * transactions?: Array<import('../../sequelize/models/Transaction')>
 * }} ChangeControllerMessagesExtractorParams
 */