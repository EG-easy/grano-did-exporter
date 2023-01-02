// @ts-check
'use strict'

const Controller = require('../../sequelize/models/Controller')

/**
 * ControllerSaver.
 */
class ControllerSaver {
  /**
   * processSaveController.
   *
   * @param {import('./ChangeControllerMessageSaver').ChangeControllerMessageParam} param
   * @param {import('sequelize').CreateOptions} options
   */
  async processSaveController (
    param,
    options,
  ) {
    const currentController = await this.findCurrentController(param.identifier)
    const newParam = {
      transactionId: param.transactionId,
      identifier: param.identifier,
      version: currentController?.version + 1 ?? 1,
      controller: param.newController,
    }

    return this.createController(newParam, options)
  }

  /**
   * findNextVersion.
   *
   * @param {String} identifier
   * @returns {Promise<Controller>}
   */
  async findCurrentController (identifier) {
    return Controller.scope([
      { method: ['?identifier', identifier] }
    ]).findOne({
      order: [['version', 'DESC']]
    })
  }

  /**
   * createController
   *
   * @param {ControllerParam} param
   * @param {import('sequelize').CreateOptions} options
   * @return {Promise<Controller>}
   */
  async createController (
    param,
    options
  ) {
    return Controller.create(
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
 * identifier: String,
 * controller: String,
 * }} ControllerMessageParam
 */

/**
 * @typedef {{
 * identifier: String,
 * version: Number,
 * controller: String,
 * }} ControllerParam
 */
