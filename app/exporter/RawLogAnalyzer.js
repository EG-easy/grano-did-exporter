// @ts-check
'use strict'

/**
 * RawLogAnalyzer.
 */
class RawLogAnalyzer {
  /**
   * constructor.
   *
   * @param {RawLogAnalyzerParams} params - rawLogAnalyzer params
   */
  constructor ({

  } = {}) {
  }

  /**
   * create.
   *
   * @param {RawLogAnalyzerParams} params - rawLogAnalyzer params
   * @returns {RawLogAnalyzer}
   */
  static create (params = {}) {
    return new this(params)
  }
}

module.exports = RawLogAnalyzer

/**
 * @typedef {{
 * }} RawLogAnalyzerParams
 */
