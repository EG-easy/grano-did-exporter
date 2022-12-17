// @ts-check
'use strict'

const Block = require('../../sequelize/models/Block')

/**
 * BlockSaver.
 */
class BlockSaver {
  /**
   * save ipn
   *
   * @param {BlockParam} param
   * @param {import('sequelize').QueryOptions} options
   * @return {Promise<Block>}
   */
  async saveBlock (
    param,
    options
  ) {
    return Block.create(
      {
        ...param,
      },
      options
    )
  }
}

module.exports = BlockSaver

/**
 * @typedef {{
 * height: Number,
 * time: Date,
 * }} BlockParam
 */
