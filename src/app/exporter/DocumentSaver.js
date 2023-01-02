// @ts-check
'use strict'

const Document = require('../../sequelize/models/Document')

/**
 * DocumentSaver.
 */
class DocumentSaver {
  /**
   * processSetAttributeMessageToSaveDocument.
   *
   * @param {import('./SetAttributeMessageSaver').SetAttributeMessageParam} param
   * @param {import('sequelize').CreateOptions} options
   */
  async processSetAttributeMessageToSaveDocument (
    param,
    options,
  ) {
    const document = await this.findCurrentDocument(param.identifier)
    const parsedCurrentContent = JSON.parse(document?.content ?? '{}')

    const newContent = { [param.name]: [param.value] }

    const mergedContent = this.mergeContent(parsedCurrentContent, newContent)

    const currentVersion = document?.version ?? 0

    const newParam = {
      identifier: param.identifier,
      version: currentVersion + 1,
      content: JSON.stringify(mergedContent),
    }

    return this.createDocument(newParam, options)
  }

  /**
   * processRevokeAttributeMessageToSaveDocument.
   *
   * @param {import('./RevokeAttributeMessageSaver').RevokeAttributeMessageParam} param
   * @param {import('sequelize').CreateOptions} options
   */
  async processRevokeAttributeMessageToSaveDocument (
    param,
    options,
  ) {
    const document = await this.findCurrentDocument(param.identifier)
    const parsedCurrentContent = JSON.parse(document?.content ?? '{}')

    parsedCurrentContent[param.name] = this.removeContent(parsedCurrentContent[param.name], param.value)

    const currentVersion = document?.version ?? 0

    const newParam = {
      identifier: param.identifier,
      version: currentVersion + 1,
      content: JSON.stringify(parsedCurrentContent),
    }

    return this.createDocument(newParam, options)
  }

  /**
   * batchCreateDocuments
   *
   * @param {DocumentParam} param
   * @param {import('sequelize').CreateOptions} options
   * @return {Promise<Document>}
   */
  async createDocument (
    param,
    options
  ) {
    return Document.create(
      {
        ...param,
      },
      options
    )
  }

  /**
   * findCurrentDocument.
   *
   * @param {String} identifier
   * @returns {Promise<Document>}
   */
  async findCurrentDocument (identifier) {
    return Document.scope([
      { method: ['?identifier', identifier] }
    ]).findOne({
      order: [['version', 'DESC']]
    })
  }

  /**
   * mergeContent.
   *
   * @param {object} currentContent
   * @param {object} newContent
   * @returns {object} merged
   */
  mergeContent (
    currentContent,
    newContent
  ) {
    const key = Object.keys(newContent)[0]

    // it has same key
    if (key in currentContent) {
      const arr = currentContent[key].concat(newContent[key])
      // remove duplicated values
      currentContent[key] = Array.from(new Set(arr))

      return currentContent
    }

    Object.assign(currentContent, newContent)

    return currentContent
  }

  /**
   * removeContent.
   *
   * @param {Array} arr
   * @param {String} value
   * @returns {Array}
   */
  removeContent (
    arr,
    value
  ) {
    const index = arr.indexOf(value)
    if (index > -1) {
      arr.splice(index, 1)
    }

    return arr
  }
}

module.exports = DocumentSaver

/**
 * @typedef {{
 * identifier: String,
 * version: Number,
 * content: String,
 * }} DocumentParam
 */
