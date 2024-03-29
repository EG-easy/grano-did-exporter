// @ts-check
'use strict'

require('dotenv').config()
const logger = require('pino')()

const { logs } = require('@cosmjs/stargate')

require('../../sequelize/models')

const BlockSaver = require('./BlockSaver')
const TransactionSaver = require('./TransactionSaver')
const ChangeControllerMessageSaver = require('./ChangeControllerMessageSaver')
const SetAttributeMessageSaver = require('./SetAttributeMessageSaver')
const RevokeAttributeMessageSaver = require('./RevokeAttributeMessageSaver')
const ControllerSaver = require('./ControllerSaver')
const DocumentSaver = require('./DocumentSaver')

const Block = require('../../sequelize/models/Block')

const ChangeControllerMessagesExtractor = require('./ChangeControllerMessagesExtractor')
const SetAttributeMessagesExtractor = require('./SetAttributeMessagesExtractor')
const RevokeAttributeMessagesExtractor = require('./RevokeAttributeMessagesExtractor')

/**
 * GranoDidExporter.
 */
class GranoDidExporter {
  /**
   * constructor.
   *
   * @param {GranoDidExporterParams} params - exporter params
   */
  constructor ({
    granoDidClient,
    blockSaver = new BlockSaver(),
    transactionSaver = new TransactionSaver(),
    changeControllerMessageSaver = new ChangeControllerMessageSaver(),
    setAttributeMessageSaver = new SetAttributeMessageSaver(),
    revokeAttributeMessageSaver = new RevokeAttributeMessageSaver(),
    controllerSaver = new ControllerSaver(),
    documentSaver = new DocumentSaver(),
    contractAddress = process.env.CONTRACT_ADDRESS,
  } = {}) {
    this.granoDidClient = granoDidClient
    this.blockSaver = blockSaver
    this.transactionSaver = transactionSaver
    this.changeControllerMessageSaver = changeControllerMessageSaver
    this.setAttributeMessageSaver = setAttributeMessageSaver
    this.revokeAttributeMessageSaver = revokeAttributeMessageSaver
    this.controllerSaver = controllerSaver
    this.documentSaver = documentSaver
    this.contractAddress = contractAddress
  }

  /**
   * create.
   *
   * @param {GranoDidExporterParams} params - exporter params
   * @returns {GranoDidExporter}
   */
  static create (params = {}) {
    return new this(params)
  }

  /**
   * process.
   */
  async process () {
    const blockHeightFromNode = await this.fetchLatestBlockFromNode()
    const blockHeightFromDataBase = await this.fetchLatestBlockFromDataBase()

    if (blockHeightFromNode.header.height > blockHeightFromDataBase.height) {
      this.sync(blockHeightFromDataBase.height + 1)
    }
  }

  /**
   * repeatProcess.
   */
  async repeatProcess () {
    // eslint-disable-next-line
    while (true) {
      // eslint-disable-next-line
      await this.process()
    }
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
        if (extractChangeControllerMessages.length > 0) {
          await this.changeControllerMessageSaver.batchCreateChangeControllerMessages(extractChangeControllerMessages, { transaction: t })

          // TODO: update to save all controller changes
          await this.controllerSaver.processSaveController(extractChangeControllerMessages[0], { transaction: t })
        }

        const extractSetAttributeMessages = SetAttributeMessagesExtractor.create({ transactions: targetTransactions }).extractSetAttributeMessages()
        if (extractSetAttributeMessages.length > 0) {
          await this.setAttributeMessageSaver.batchCreateSetAttributeMessages(extractSetAttributeMessages, { transaction: t })

          await this.documentSaver.processSetAttributeMessageToSaveDocument(extractSetAttributeMessages[0], { transaction: t })
        }

        const extractRevokeAttributeMessages = RevokeAttributeMessagesExtractor.create({ transactions: targetTransactions }).extractRevokeAttributeMessages()
        if (extractRevokeAttributeMessages.length > 0) {
          await this.revokeAttributeMessageSaver.batchCreateRevokeAttributeMessages(extractRevokeAttributeMessages, { transaction: t })

          await this.documentSaver.processRevokeAttributeMessageToSaveDocument(extractRevokeAttributeMessages[0], { transaction: t })
        }
      })
    } catch (error) {
      throw new Error(`rollbacked: ${error}`)
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
   * fetchLatestBlockFromNode.
   *
   * @returns {Promise<import('@cosmjs/stargate').Block>} block
   * @throws
   */
  async fetchLatestBlockFromNode () {
    return this.fetchBlockbyBlockHeight(null)
  }

  /**
   * fetchLatestBlockFromDataBase.
   *
   * @returns {Promise<Block>} block
   */
  async fetchLatestBlockFromDataBase () {
    return Block.findOne({
      order: [['id', 'DESC']],
    })
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
        logger.info(`parse error: ${error}`)
      }
    })
  }
}

module.exports = GranoDidExporter

/**
 * @typedef {{
 *   granoDidClient?: import('@eg-easy/grano-did-client').GranoDidClient
 *   blockSaver?: BlockSaver
 *   transactionSaver?: TransactionSaver
 *   changeControllerMessageSaver?: ChangeControllerMessageSaver
 *   setAttributeMessageSaver?: SetAttributeMessageSaver
 *   revokeAttributeMessageSaver?: RevokeAttributeMessageSaver
 *   controllerSaver?: ControllerSaver
 *   documentSaver?: DocumentSaver
 *   contractAddress?: String
 * }} GranoDidExporterParams
 */
