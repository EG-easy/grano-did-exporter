// @ts-check
'use strict'

const Document = require('../../sequelize/models/Document')

/**
 * DocumentSaver.
 */
class DocumentSaver {
  /**
   * save ipn
   *
   * @param {Array<DocumentParam>} param
   * @param {import('sequelize').QueryOptions} options
   * @return {Promise<Array<Document>>}
   */
  async batchCreateDocuments (
    param,
    options
  ) {
    return Document.bulkCreate(
      {
        ...param,
      },
      options
    )
  }
}

module.exports = DocumentSaver

/**
 * @typedef {{
 * identifierId: Number,
 * version: Number,
 * content: String,
 * }} DocumentParam
 */
