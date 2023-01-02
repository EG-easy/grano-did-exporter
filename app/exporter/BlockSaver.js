// @ts-check
'use strict'

const Block = require('../../sequelize/models/Block')

/**
 * BlockSaver.
 */
class BlockSaver {
  /**
   * saveBlock
   *
   * @param {BlockParam} param
   * @param {import('sequelize').CreateOptions} options
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
