// @ts-check
'use strict'

function appendDatetimeFields (values) {
  return values.map(value => {
    return {
      ...value,
      created_at: new Date(),
      updated_at: new Date()
    }
  })
}

module.exports = appendDatetimeFields
