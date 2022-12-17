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
    contractAddress,
  } = {}) {
    this.transactions = transactions
    this.contractAddress = contractAddress
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
    return this.transactions.map( transaction => {
      const log = logs.parseRawLog(transaction.rawLog)
      const contractAddressObject = logs.findAttribute(log, 'wasm', '_contract_address')
      if (this.contractAddress === contractAddressObject.value) {
        const identifierObject = logs.findAttribute(log, 'wasm', 'identifier')
        const newControllerObject = logs.findAttribute(log, 'wasm', 'controller')

        return {
          transactionId: transaction.id,
          identifier: identifierObject.value,
          newController: newControllerObject.value,
        }
      }
    })
  }
}

module.exports = ChangeControllerMessagesExtractor

/**
 * @typedef {{
 * transactions?: Array<transaction>
 * contractAddress?: String
 * }} ChangeControllerMessagesExtractorParams
 */

/**
 * @typedef {{
 * id: Number
 * hash: String
 * rawLog: String
 * }} transaction
 */
