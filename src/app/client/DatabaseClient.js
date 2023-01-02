// @ts-check
'use strict'

require('dotenv').config()

require('../../sequelize/models')

const Document = require('../../sequelize/models/Document')
const Controller = require('../../sequelize/models/Controller')

/**
 * DatabaseClient.
 */
class DatabaseClient {
  /**
   * fetchGranoDidDocument.
   *
   * @param {{
   *   identifier: String
   * }} params
   */
  async fetchGranoDidDocument ({
    identifier,
  }) {
    const documentResult = await this.findDocument({ identifier })
    const parsedDocument = JSON.parse(documentResult.content)

    const controllerResult = await this.findController({ identifier })

    return {
      controller: controllerResult.controller,
      ...parsedDocument,
    }
  }

  /**
   * findController.
   *
   * @param {{
   *   identifier: String
   * }} params
   * @returns {Promise<Controller>}
   */
  async findController ({
    identifier,
  }) {
    return Controller.scope([
      { method: ['?identifier', identifier] }
    ]).findOne({
      order: [['id', 'DESC']]
    })
  }

  /**
   * findDocument.
   *
   * @param {{
   *   identifier: String
   * }} params
   * @returns {Promise<Document>}
   */
  async findDocument ({
    identifier,
  }) {
    return Document.scope([
      { method: ['?identifier', identifier] }
    ]).findOne({
      order: [['id', 'DESC']]
    })
  }
}

module.exports = DatabaseClient
