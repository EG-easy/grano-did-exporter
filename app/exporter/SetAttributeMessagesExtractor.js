// @ts-check
'use strict'

const { logs } = require('@cosmjs/stargate')

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
    contractAddress,
  } = {}) {
    this.transactions = transactions
    this.contractAddress = contractAddress
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
    return this.transactions.map( transaction => {
      const log = logs.parseRawLog(transaction.rawLog)
      const contractAddressObject = logs.findAttribute(log, 'wasm', '_contract_address')
      if (this.contractAddress === contractAddressObject.value) {
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
      }
    })
  }
}

module.exports = SetAttributeMessagesExtractor

/**
 * @typedef {{
 * transactions?: Array<transaction>
 * contractAddress?: String
 * }} SetAttributeMessagesExtractorParams
 */

/**
 * @typedef {{
 * id: Number
 * hash: String
 * rawLog: String
 * }} transaction
 */
