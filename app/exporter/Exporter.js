// @ts-check
'use strict'

require('dotenv').config()

const { logs } = require('@cosmjs/stargate')
const { GranoDidClient } = require('@eg-easy/grano-did-client')

const db = require('../../sequelize/models')

const BlockSaver = require('./BlockSaver')
const TransactionSaver = require('./TransactionSaver')
const ChangeControllerMessageSaver = require('./ChangeControllerMessageSaver')
const SetAttributeMessageSaver = require('./SetAttributeMessageSaver')
const RevokeAttributeMessageSaver = require('./RevokeAttributeMessageSaver')

const Block = require('../../sequelize/models/Block')

const ChangeControllerMessagesExtractor = require('./ChangeControllerMessagesExtractor')
const SetAttributeMessagesExtractor = require('./SetAttributeMessagesExtractor')
const RevokeAttributeMessagesExtractor = require('./RevokeAttributeMessagesExtractor')

/**
 * Exporter.
 */
class Exporter {
  /**
   * constructor.
   *
   * @param {ExporterParams} params - exporter params
   */
  constructor ({
    granoDidClient = GranoDidClient.create(),
    blockSaver = new BlockSaver(),
    transactionSaver = new TransactionSaver(),
    changeControllerMessageSaver = new ChangeControllerMessageSaver(),
    setAttributeMessageSaver = new SetAttributeMessageSaver(),
    revokeAttributeMessageSaver = new RevokeAttributeMessageSaver(),
    contractAddress = process.env.CONTRACT_ADDRESS,
  } = {}) {
    this.granoDidClient = granoDidClient
    this.blockSaver = blockSaver
    this.transactionSaver = transactionSaver
    this.changeControllerMessageSaver = changeControllerMessageSaver
    this.setAttributeMessageSaver = setAttributeMessageSaver
    this.revokeAttributeMessageSaver = revokeAttributeMessageSaver
    this.contractAddress = contractAddress
  }

  /**
   * create.
   *
   * @param {ExporterParams} params - exporter params
   * @returns {Exporter}
   */
  static create (params = {}) {
    return new this(params)
  }

  /**
   * sync.
   *
   * @param {Number} height
   */
  async sync (height) {
    // fetch from the blockchain
    const rawBlock = await this.fetchBlockbyBlockHeight(height)
    const rawTransactions = await this.fetchTransactionsByHeight(height)

    // save in the database
    try {
      Block.sequelize.transaction(async t => {
        const extractBlock = this.extractBlock(rawBlock)
        const savedBlock = await this.blockSaver.saveBlock(extractBlock, { transaction: t })

        const extractTransactions = this.extractTransactions(savedBlock, rawTransactions)
        const savedTransactions = await this.transactionSaver.batchCreateTransactions(extractTransactions, { transaction: t })

        const targetTransactions = this.findTargetTransactions(savedTransactions, this.contractAddress)

        // return if no grano-did-contract txs exist
        if (targetTransactions.length === 0) {
          return
        }

        const extractChangeControllerMessages = ChangeControllerMessagesExtractor.create({ transactions: targetTransactions }).extractChangeControllerMessages()
        await this.changeControllerMessageSaver.batchCreateChangeControllerMessages(extractChangeControllerMessages, { transaction: t })

        const extractSetAttributeMessages = SetAttributeMessagesExtractor.create({ transactions: targetTransactions }).extractSetAttributeMessages()
        await this.setAttributeMessageSaver.batchCreateSetAttributeMessages(extractSetAttributeMessages, { transaction: t })

        const extractRevokeAttributeMessages = RevokeAttributeMessagesExtractor.create({ transactions: targetTransactions }).extractRevokeAttributeMessages()
        await this.revokeAttributeMessageSaver.batchCreateRevokeAttributeMessages(extractRevokeAttributeMessages, { transaction: t })
      })
    } catch (error) {
      throw new Error(`rollbacked: ${error}`)
    }
  }

  /**
   * fetchLatestBlockFromNode.
   *
   * @returns {Promise<import('@cosmjs/stargate').Block>} block
   * @throws
   */
  async fetchLatestBlockFromNode () {
    try {
      return this.granoDidClient.client.getBlock()
    } catch (error) {
      throw new Error(`Not found block: ${error}`)
    }
  }

  /**
   * fetchBlockbyBlockHeight.
   *
   * @param {Number} height
   * @returns {Promise<import('@cosmjs/stargate').Block>} block
   * @throws
   */
  async fetchBlockbyBlockHeight (height) {
    try {
      return this.granoDidClient.client.getBlock(height)
    } catch (error) {
      throw new Error(`Not found block: ${error}`)
    }
  }

  /**
   * fetchTransactionsByHeight.
   *
   * @param {Number} height
   * @returns {Promise<Array<import('@cosmjs/stargate').IndexedTx>>} IndexedTx
   * @throws
   */
  async fetchTransactionsByHeight (height) {
    try {
      return this.granoDidClient.client.searchTx({ height: height })
    } catch (error) {
      throw new Error(`Not found txs: ${error}`)
    }
  }

  /**
   * extractBlock.
   *
   * @param {import('@cosmjs/stargate').Block} block
   * @returns {import('./BlockSaver').BlockParam} - block model entity
   */
  extractBlock (block) {
    return {
      height: block.header.height,
      time: new Date(block.header.time),
    }
  }

  /**
   * extractTransactions.
   *
   * @param {Block} block
   * @param {Array<import('@cosmjs/stargate').IndexedTx>} transactions
   * @returns {Array<import('./TransactionSaver').TransactionParam>} - transaction model entity
   */
  extractTransactions (
    block,
    transactions
  ) {
    return transactions.map(transaction => {
      return {
        blockId: block.id,
        hash: transaction.hash,
        rawLog: transaction.rawLog,
      }
    })
  }

  /**
   * findTargetTransactions
   *
   * @param {Array<import('../../sequelize/models/Transaction')>} transactions
   * @param {String} contractAddress
   * @returns {Array<import('../../sequelize/models/Transaction')>}
   */
  findTargetTransactions (
    transactions,
    contractAddress
  ) {
    return transactions.filter( transaction => {
      try {
        const log = logs.parseRawLog(transaction.rawLog)
        const contractAddressObject = logs.findAttribute(log, 'wasm', '_contract_address')
        if (contractAddress === contractAddressObject.value) {
          return transaction
        }
      } catch (error) {
        console.log('parse err: ', error)
      }
    })
  }
}

module.exports = Exporter

/**
 * @typedef {{
 *   granoDidClient?: import('@eg-easy/grano-did-client').GranoDidClient
 *   blockSaver?: BlockSaver
 *   transactionSaver?: TransactionSaver
 *   changeControllerMessageSaver?: ChangeControllerMessageSaver
 *   setAttributeMessageSaver?: SetAttributeMessageSaver
 *   revokeAttributeMessageSaver?: RevokeAttributeMessageSaver
 *   contractAddress?: String
 * }} ExporterParams
 */
