// @ts-check
'use strict'

const { logs } = require('@cosmjs/stargate')

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
    contractAddress,
  } = {}) {
    this.transactions = transactions
    this.contractAddress = contractAddress
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
    return this.transactions.map( transaction => {
      const log = logs.parseRawLog(transaction.rawLog)
      const contractAddressObject = logs.findAttribute(log, 'wasm', '_contract_address')
      if (this.contractAddress === contractAddressObject.value) {
        const identifierObject = logs.findAttribute(log, 'wasm', 'identifier')
        const nameObject = logs.findAttribute(log, 'wasm', 'name')
        const valueObject = logs.findAttribute(log, 'wasm', 'value')

        return {
          transactionId: transaction.id,
          identifier: identifierObject.value,
          name: nameObject.value,
          value: valueObject.value,
        }
      }
    })
  }
}

module.exports = RevokeAttributeMessagesExtractor

/**
 * @typedef {{
 * transactions?: Array<transaction>
 * contractAddress?: String
 * }} RevokeAttributeMessagesExtractorParams
 */

/**
 * @typedef {{
 * id: Number
 * hash: String
 * rawLog: String
 * }} transaction
 */
