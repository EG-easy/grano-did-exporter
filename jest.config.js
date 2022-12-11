// @ts-check
'use strict'

module.exports = {
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  setupFilesAfterEnv: [
    `${process.cwd()}/jest.setup.js`
  ]
}
