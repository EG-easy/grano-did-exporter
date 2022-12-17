// @ts-check
'use strict'

const Controller = require('../../sequelize/models/Controller')

/**
 * ControllerSaver.
 */
class ControllerSaver {
  /**
   * save ipn
   *
   * @param {Array<ControllerParam>} param
   * @param {import('sequelize').BulkCreateOptions} options
   * @return {Promise<Array<Controller>>}
   */
  async batchCreateControllers (
    param,
    options
  ) {
    return Controller.bulkCreate(
      {
        ...param,
      },
      options
    )
  }
}

module.exports = ControllerSaver

/**
 * @typedef {{
 * identifierId: Number,
 * version: Number,
 * controller: String,
 * }} ControllerParam
 */
