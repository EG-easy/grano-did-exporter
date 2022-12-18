// @ts-check
'use strict'

const { logs } = require('@cosmjs/stargate')

/**
 * IdentifiersExtractor.
 */
class IdentifiersExtractor {
  /**
   * constructor.
   *
   * @param {IdentifiersExtractorParams} params - exporter params
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
   * @param {IdentifiersExtractorParams} params - exporter params
   * @returns {IdentifiersExtractor}
   */
  static create (params = {}) {
    return new this(params)
  }

  /**
   * extractIdentifiers.
   *
   * @returns {Array<import('./IdentifierSaver').IdentifierParam>}
   */
  extractIdentifiers () {
    return this.transactions.map( transaction => {
      const log = logs.parseRawLog(transaction.rawLog)
      const contractAddressObject = logs.findAttribute(log, 'wasm', '_contract_address')
      if (this.contractAddress === contractAddressObject.value) {
        const identifierObject = logs.findAttribute(log, 'wasm', 'identifier')

        return {
          identifier: identifierObject.value
        }
      }
    })
  }
}

module.exports = IdentifiersExtractor

/**
 * @typedef {{
 * transactions?: Array<import('../../sequelize/models/Transaction')>
 * contractAddress?: String
 * }} IdentifiersExtractorParams
 */

